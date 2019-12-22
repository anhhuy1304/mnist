import numpy as np
import tensorflow as tf
from keras.models import model_from_json
import matplotlib.pyplot as plt
from keras.datasets import mnist
from keras.preprocessing.image import load_img
from keras.preprocessing.image import save_img
from keras.preprocessing.image import img_to_array
from keras.preprocessing.image import array_to_img
import sys
from PIL import Image  
import PIL  

json_file = open('/home/anhhuy/Documents/project/detectNumber/cnn/model.json', 'r')
json_model = json_file.read()
json_file.close()
model = model_from_json(json_model)
model.load_weights('/home/anhhuy/Documents/project/detectNumber/cnn/weights.h5')


img = load_img('/home/anhhuy/Documents/project/detectNumber/image.png', grayscale=True, target_size=(28, 28))
img.save("/home/anhhuy/Documents/project/detectNumber/test1.png")

#convert to array
img = img_to_array(img)

#reshape
img = img.reshape(1, 28, 28, 1)

# Biến đổi kiểu dữ liệu của ảnh sang kiểu dữ liệu float
img = img.astype('float32')

# Chuẩn hóa giá trị của ảnh về [0, 1]
img /= 255

#predict
predict = model.predict(img)
print(predict)
sys.stdout.flush()