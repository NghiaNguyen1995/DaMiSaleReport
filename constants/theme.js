import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
    // base colors
    primary: "#24C16B", 
    secondary: "#187a43ff", 
    blue: "#0000FF",
    lightblue:'#87CEFA',
    green: "#66D59A",
    lightGreen: "#E6FEF0",
    lime: "#00BA63",
    emerald: "#2BC978",
    red: "#FF4134",
    lightRed: "#FFF1F0",
    purple: "#6B3CE9",
    lightpurple: "#F3EFFF",
    yellow: "#FFC664",
    lightyellow: "#FFFFE0",
    black: "#1E1F20",
    white: "#FFFFFF",
    lightGray: '#DCDCDC',
    gray: "#C1C3C5",
    darkgray: "#76797A",
    transparent: "transparent",
    brown: '#F4A460',
    lightbrown: '#FFF9EC',
    buttonborder: '#ff7426',
    whitesmoke:'#F5F5F5',
    app:{
        title: '#C60000',
        buttonLogin: '#0DA805'
    },
    tinhtrang:{
        daduyet: '#66CC00',
        choduyet: 'black',
        tuchoi: '#EE7942'
    },
    skin1:{
        bgheader: '#04A9B9',
        bgflatlist: '#5AB2BA',
        bgfooter:'#5AB2BA',
    },
    skin2:{
        bgheader: '#0FB95B',
        bgflatlist: '#24C16B',
        bgfooter:'#24C16B',
    },
    skin3:{
        bgheader: '#0FB95B',
        bgflatlist: '#0795a3',
        bgfooter:'#24C16B',
    },
    chamcong:{
        giovao:'#5834eb',
        giora:'#0795a3'
    }
};

export const SIZES = {
    // global sizes
    base: 8,
    font: 14,
    radius: 30,
    padding: 10,
    padding2: 12,

    // font sizes
    largeTitle: 50,
    h1: 25,
    h2: 22,
    h3: 20,
    h4: 17,
    h5: 14,
    body1: 30,
    body2: 23,
    body3: 16,
    body4: 14,
    body5: 12,
    dialogTitle: 20,
    // app dimensions
    width,
    height
};

export const FONTS = {
    largeTitle: { fontFamily: "Roboto-regular", fontSize: SIZES.largeTitle, lineHeight: 55 },
    h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
    h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
    h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
    h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
    body1: { fontFamily: "Roboto-Regular", fontSize: SIZES.body1, lineHeight: 36 },
    body2: { fontFamily: "Roboto-Regular", fontSize: SIZES.body2, lineHeight: 30 },
    body3: { fontFamily: "Roboto-Regular", fontSize: SIZES.body3, lineHeight: 22 },
    body4: { fontFamily: "Roboto-Regular", fontSize: SIZES.body4, lineHeight: 22 },
    body5: { fontFamily: "Roboto-Regular", fontSize: SIZES.body5, lineHeight: 22 },
};

export const object = StyleSheet.create({
    labelTitle: {
        color: 'white',
        fontSize: SIZES.dialogTitle,    
        font: FONTS.h4,
        textAlign: 'center',
        
    },
    labelTitle1: {
        color: 'white',
        fontSize: SIZES.dialogTitle,    
        font: FONTS.h4,
        textAlign: 'center',
        
    },
    labelDSSA: {
        fontSize: SIZES.dialogTitle,    
        font: FONTS.h3,
        textAlign: 'center',
        
    },

})

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;