
chequer_x = 0
chequer_y = 0
width = 9
height = 9

x = 130
y = 70

for chequer_x in range(4):
    for chequer_y in range(4):
        print("<widget name=\"nextChequer%d%d\" class=\"widget\">\n<property name=\"rect\">%d, %d, %d, %d</property>\n<property name=\"background\">255, 146, 143, 140</property>\n</widget>"%(chequer_x,chequer_y,x+chequer_x*10,y-chequer_y*10,width,height))

x = 0
y = 200

for chequer_x in range(10):
    for chequer_y in range(20):
        print("<widget name=\"chequer%d%d\" class=\"widget\">\n<property name=\"rect\">%d, %d, %d, %d</property>\n<property name=\"background\">255, 146, 143, 140</property>\n</widget>"%(chequer_x,chequer_y,x+chequer_x*10,y-chequer_y*10,width,height))