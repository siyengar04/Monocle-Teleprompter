import touch
import display
import ujson as json
import led

led.off(led.RED)

# Load weather data from 'weather.json'
with open('weather.json') as file:
    weather_data = json.load(file)

index = 0
maxCharLength = 24

def main():
    display.clear()
    y = 0

    if index < len(weather_data):
        current_weather = weather_data[index]
        for key, value in current_weather.items():
            line = "{}: {}".format(key, value)
            if len(line) > maxCharLength:
                split_lines = split_string(line, maxCharLength)
                for sub_line in split_lines:
                    display.text(sub_line, 0, y, display.WHITE)
                    y += 20
            else:
                display.text(line, 0, y, display.WHITE)
                y += 20
        display.show()
    else:
        display.text("No data", 0, 0, display.WHITE)
        display.show()

def nav(touch_input):
    global index
    if touch_input == touch.A and index < len(weather_data) - 1:
        index += 1
    elif touch_input == touch.B and index > 0:
        index -= 1
    main()

def split_string(string, split_point):
    return [string[:split_point], string[split_point:]]

touch.callback(touch.EITHER, nav)

main()
