import cv2
import sys
import os
ress = [1040, 700, 460, 300, 240]
image = cv2.imread(sys.argv[1])
folder_name = os.path.splitext(sys.argv[1])[0]
root = os.curdir
os.makedirs(os.path.join(root, folder_name))

for res in ress:
    img = cv2.resize(image, (res, int(image.shape[0] * (res/image.shape[1]))), interpolation=cv2.INTER_AREA)
    image_name = str(res)+ '.png'
    cv2.imwrite( image_name, img)
    os.rename(image_name, os.path.join(folder_name, str(res)))

