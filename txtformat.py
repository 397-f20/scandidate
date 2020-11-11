def main():
    file = open("screens/iconlist.txt", "r")
    lines = file.readlines()
    raw_output = []
    for l in lines:
        raw_output.append(l.split(","))
    output = open("updated_iconlist.txt", "w")
    for i in raw_output:
        for j in i:
            output.write(j + "\n")
    output.close()
    print("123")
    
main()