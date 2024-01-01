import {
    amber,
    blue,
    blueGrey,
    brown,
    cyan,
    deepOrange,
    deepPurple,
    green,
    grey,
    indigo,
    lightBlue,
    lightGreen,
    lime,
    orange,
    pink,
    purple,
    red,
    teal,
    yellow
} from '@mui/material/colors';

const allColors = [
    ...Object.values(amber),
    ...Object.values(blue),
    ...Object.values(blueGrey),
    ...Object.values(brown),
    ...Object.values(cyan),
    ...Object.values(deepOrange),
    ...Object.values(deepPurple),
    ...Object.values(green),
    ...Object.values(grey),
    ...Object.values(indigo),
    ...Object.values(lightBlue),
    ...Object.values(lightGreen),
    ...Object.values(lime),
    ...Object.values(orange),
    ...Object.values(pink),
    ...Object.values(purple),
    ...Object.values(red),
    ...Object.values(teal),
    ...Object.values(yellow)
]

export const getRandomColor = () => {
    return allColors[Math.floor(Math.random() * allColors.length)];
}