import orange from "@material-ui/core/colors/orange";
import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import purple from "@material-ui/core/colors/purple";
import indigo from "@material-ui/core/colors/indigo";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import yellow from "@material-ui/core/colors/yellow";
import brown from "@material-ui/core/colors/brown";
import grey from "@material-ui/core/colors/grey";
import teal from "@material-ui/core/colors/teal";

const ColorEnum = {
    WHITE: {name: "WHITE", color: "#FFFFFF"},
    RED: {name: "RED", color: red[200]},
    ORANGE: {name: "ORANGE", color: orange[200]},
    YELLOW: {name: "YELLOW", color: yellow[200]},
    PINK: {name: "PINK", color: pink[200]},
    PURPLE: {name: "PURPLE", color: purple[200]},
    INDIGO: {name: "INDIGO", color: indigo[200]},
    BLUE: {name: "BLUE", color: blue[200]},
    TEAL: {name: "TEAL", color: teal[200]},
    GREEN: {name: "GREEN", color: green[200]},
    BROWN: {name: "BROWN", color: brown[200]},
    GREY: {name: "GREY", color: grey[200]}
};

export function fromName(colorName) {
    let colorEnum = ColorEnum[colorName];
    if (!colorEnum) {
        throw new Error("The name of the color doesn't belong to ColorEnum");
    }

    return colorEnum;
}

export default ColorEnum;