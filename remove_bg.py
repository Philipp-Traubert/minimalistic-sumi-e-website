import sys
import subprocess

def install_pillow():
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    except:
        print("Failed to install Pillow. Please install it manually.")
        sys.exit(1)

try:
    from PIL import Image
except ImportError:
    print("Pillow not found. Installing...")
    install_pillow()
    from PIL import Image

def remove_white_background(input_path, output_path, threshold=240):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Check if pixel is close to white
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            newData.append((255, 255, 255, 0))  # Transparent
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")
    print(f"Saved transparent image to {output_path}")

if __name__ == "__main__":
    input_file = "src/assets/single-petal.png"
    output_file = "src/assets/single-petal-transparent.png"
    remove_white_background(input_file, output_file)
