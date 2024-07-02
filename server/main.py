from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
import math
from sklearn.preprocessing import LabelEncoder
from sklearn.neighbors import NearestNeighbors
from surprise import Dataset,Reader
from surprise.model_selection import train_test_split
from surprise import KNNWithMeans



app = Flask(__name__)
cors = CORS(app,origins='*')

@app.route("/api/users", methods=['GET'])
def users():
    return jsonify(
        {
            "users": ['abcd',
                      'name1']
        }
    )

@app.route('/api/loginUser',methods=['POST'])
def display():
    dataset = pd.read_csv("C:/Users/skraj/Desktop/BDA/f_dataset(1).csv")
    sub_dataset = dataset[["user_id","user_rating","title_code","Title"]].copy()
    index_to_course = {}
    course_to_index = {}
    for index,row in sub_dataset.iterrows():
        id = row["title_code"]
        title = row["Title"]
        index_to_course[id] = title
        course_to_index[title] = id
    grouped_dict = sub_dataset.groupby('user_id').apply(lambda x: dict(zip(x['title_code'], x['user_rating'])))
    df_user_ratings = pd.DataFrame(grouped_dict).reset_index()
    df_user_ratings.columns = ['user_id', 'ratings_dict']
    courses_id = range(1,81)
    user_item_matrix = []
    for index,row in df_user_ratings.iterrows():
       id = row["user_id"]
       rating_dict = row["ratings_dict"]
       temp = []
       for course in courses_id:
          temp.append(extract_rating(rating_dict,course))
       user_item_matrix.append({"user_id":id,"item_list":temp})
    rating_matrix = pd.DataFrame(user_item_matrix)
    items_df = pd.DataFrame(rating_matrix['item_list'].tolist(), columns=[f'item{i+1}' for i in range(len(rating_matrix['item_list'].iloc[0]))])
    rating_matrix = pd.concat([items_df], axis=1)
    copy_rating_matrix = rating_matrix.copy()
    rating_matrix.replace(0, np.nan, inplace=True)
    rating_matrix = rating_matrix.fillna(rating_matrix.mean())
    target_user = int(request.json.get("user_id"))
    user_list = rating_matrix.loc[target_user,:]
    final_list_1 = {}
    for i in range(len(user_list)):
        col = 'item' + str(i+1)
        predicted_rating = predict_rating(target_user, col,rating_matrix)
        final_list_1[i+1] = predicted_rating
    final_list_2 = df_user_ratings.loc[target_user,"ratings_dict"]
    recom = {}
    for key in final_list_1:
        if key not in final_list_2:
            recom[key] = final_list_1[key]
    user_recom = []
    items = sorted(recom,reverse=True)
    for i in range(len(items)):
            if recom[items[i]] >= 4:
                user_recom.append(index_to_course[items[i]])
    return jsonify({'courses': user_recom})

def recommend_courses(item_id, n,similarity_matrix,trainset):
    similarities = similarity_matrix[item_id]
    similar_items = np.argsort(similarities)[::-1][:n]
    similar_course_ids = [trainset.to_raw_iid(idx) for idx in similar_items]
    return similar_course_ids

@app.route('/api/search', methods=['POST'])
def search():
    temp_data = pd.read_csv("C:/Users/skraj/Desktop/BDA BACKEND/Co-recom/dataset1.csv")
    data = pd.read_csv("C:/Users/skraj/Desktop/BDA BACKEND/Co-recom/dataset2.csv")
    label_encoders = {}
    encoded_data = temp_data.copy()
    for col in temp_data.columns:
        label_encoders[col] = LabelEncoder()
        encoded_data[col] = label_encoders[col].fit_transform(temp_data[col])

    
    user_input = {}
    for col in ['Category', 'Language', 'Level']:
        user_input[col] = request.json.get(col)

    print(user_input)
    subtitle = request.json.get("Subtitle")

    encoded_user_input = {}
    for col, val in user_input.items():
        encoded_user_input[col] = label_encoders[col].transform([val])[0]

    user_input_array = [[encoded_user_input['Category'], encoded_user_input['Language'], encoded_user_input['Level']]]

    knn = NearestNeighbors(n_neighbors=50)
    knn.fit(encoded_data)
    distances, indices = knn.kneighbors(user_input_array)
    

   
    index = indices.tolist()
    print(index)
    language = subtitle.split(',')
    print("HI",language)
    final_recom = []
    for x in index[0]:
       lang = data.loc[x, 'Subtitle Languages']
       print(lang)
    #    print(type(lang))
       c = 0
       fl = float('nan')
       if type(lang) == type(fl):
        #    print("true")
           continue
       data_lang = lang.split(" ")
       for l in language:
           if l in data_lang:
               c = c + 1
       if c >= 1:
        #    print("Hi")
        #    print(data.loc[x, 'Title'])
           final_recom.append(data.loc[x, 'Title'])

    return jsonify({'courses': final_recom[:12]})

def extract_rating(rating_dict,title_code):
  if title_code in rating_dict:
    return rating_dict[title_code]
  else:
    return 0
  
def pearson_correlation(user_a_ratings, user_b_ratings):
    mean_a = np.mean(user_a_ratings)
    mean_b = np.mean(user_b_ratings)

    #ovariance and standard deviations
    cov = np.sum((user_a_ratings - mean_a) * (user_b_ratings - mean_b))
    std_a = np.sqrt(np.sum((user_a_ratings - mean_a)**2))
    std_b = np.sqrt(np.sum((user_b_ratings - mean_b)**2))

    # Handle division by zero
    if std_a == 0 or std_b == 0:
        return 0

    # Calculate Pearson correlation coefficient
    correlation = cov / (std_a * std_b)
    return correlation


def predict_rating(target_user, item_index,rating_matrix):
    target_ratings = rating_matrix.loc[target_user, :]

    # Filter out users who haven't rated the item
    users_with_rating = rating_matrix.dropna(subset=[item_index])

    # Calculate similarity between target user and all other users
    similarities = {}
    for user_id, ratings in users_with_rating.iterrows():
        if user_id != target_user:
            similarity = pearson_correlation(target_ratings, ratings)
            similarities[user_id] = similarity

    # Sort users by similarity in descending order
    sorted_users = sorted(similarities.items(), key=lambda x: x[1], reverse=True)

    # Select top k similar users
    top_k_users = sorted_users[:5]  # Adjust the number of similar users as needed

    # Predict rating for the item
    weighted_sum = 0
    sum_of_weights = 0
    for user_id, similarity in top_k_users:
        user_rating = rating_matrix.loc[user_id, item_index]
        weighted_sum += similarity * user_rating
        sum_of_weights += similarity

    if sum_of_weights == 0:
        return 0  # Unable to make prediction

    predicted_rating = weighted_sum / sum_of_weights
    return predicted_rating

def extract_rating(rating_dict,title_code):
  if title_code in rating_dict:
    return rating_dict[title_code]
  else:
    return 0
  
def pearson_correlation(user_a_ratings, user_b_ratings):
    # Calculate mean ratings
    mean_a = np.mean(user_a_ratings)
    mean_b = np.mean(user_b_ratings)

    # Calculate covariance and standard deviations
    cov = np.sum((user_a_ratings - mean_a) * (user_b_ratings - mean_b))
    std_a = np.sqrt(np.sum((user_a_ratings - mean_a)**2))
    std_b = np.sqrt(np.sum((user_b_ratings - mean_b)**2))

    # Handle division by zero
    if std_a == 0 or std_b == 0:
        return 0

    # Calculate Pearson correlation coefficient
    correlation = cov / (std_a * std_b)
    return correlation










@app.route('/api/item',methods=['POST'])
def show():
    data = pd.read_csv("C:/Users/skraj/Desktop/BDA BACKEND/Co-recom/f_dataset(1).csv")
    index_to_course = {}
    course_to_index = {}
    for index,row in data.iterrows():
        id = row["title_code"]
        title = row["Title"]
        index_to_course[id] = title
        course_to_index[title] = id
    reader = Reader(rating_scale=(1, 5))
    data_obj = Dataset.load_from_df(data[["user_id", "title_code", "user_rating"]], reader)
    trainset = data_obj.build_full_trainset()
    sim_options = {
    "name": "cosine",
    "user_based": False, # for item based - false
     }
    algo = KNNWithMeans(sim_options=sim_options)
    algo.fit(trainset)
    similarity_matrix = algo.sim
    # print(course_to_index)
    item_id = course_to_index[request.json.get("course_id")]
    item_to_recommend = item_id  #item id
    recommendations = recommend_courses(trainset.to_inner_iid(item_to_recommend),10,similarity_matrix,trainset)
    recom = {}
    for x in recommendations:
        recom[x] = index_to_course[x]
    return jsonify({'courses':recom})  


if __name__ == "__main__":
    app.run(debug=True, port=8080)