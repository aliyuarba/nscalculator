let operator = Array.from(document.querySelectorAll(".keys .operator"));
let num = Array.from(document.querySelectorAll(".keys .num"));

let history = document.querySelector(".history");
let result = document.querySelector(".result");

let counter = "";
let isResult = "none";
let reg = /\./;

function formatNum(x) {
  let n = Number(x);
  return n.toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 9,
  });
}

function getNum(x) {
  return x.replace(/,/g, "");
}

num.map((num) => {
  num.addEventListener("click", function () {
    switch (num.value) {
      case ".":
        if (isResult === "equal") {
          history.innerHTML = "";
          counter = "0" + num.value;
          result.innerHTML = formatNum(counter);
        } else {
          if (result.innerHTML === "0" || result.innerHTML === "") {
            counter = "0" + num.value;
            result.innerHTML = formatNum(counter);
          } else if (reg.test(result.innerHTML)) {
            console.log("comma already");
          } else {
            counter += num.value;
            result.innerHTML = formatNum(counter);
          }
        }
        isResult = "num";
        break;
      default:
        if (isResult === "equal") {
          history.innerHTML = "";
          counter = num.value;
          result.innerHTML = formatNum(counter);
        } else {
          if (result.innerHTML === "0" && counter === "") {
            counter = num.value;
            result.innerHTML = formatNum(counter);
          } else if (result.innerHTML.length > 20) {
            console.log("too long");
          } else {
            counter += num.value;
            result.innerHTML = formatNum(counter);
          }
        }
        isResult = "num";
        break;
    }
    fontShrink();
  });
});

operator.map((opr) => {
  opr.addEventListener("click", function () {
    switch (opr.value) {
      case "=":
        if (isResult !== "equal") {
          history.innerHTML += getNum(result.innerHTML);
          try {
            counter = eval(history.innerHTML);
            result.innerHTML = formatNum(counter);
          } catch {
            result.innerHTML = "error";
          }
        }
        isResult = "equal";
        counter = "";
        break;
      case "CE":
        history.innerHTML = "";
        result.innerHTML = "0";
        isResult = "none";
        counter = "";
        break;
      case "C":
        result.innerHTML = result.innerHTML.slice(0, -1);
        if (result.innerHTML === "") {
          result.innerHTML = "0";
        }
        isResult = "operate";
        counter = "";
        break;
      case "%":
        if (isResult === "equal") {
          history.innerHTML = getNum(result.innerHTML);
        } else {
          history.innerHTML += getNum(result.innerHTML);
        }

        try {
          counter = eval(history.innerHTML) / 100;
          result.innerHTML = formatNum(counter);
        } catch {
          result.innerHTML = "error";
        }
        history.innerHTML = "(" + history.innerHTML + ") %";
        isResult = "equal";
        counter = "";
        break;

      default:
        if (isResult === "none") {
          console.log("empty");
        } else if (isResult === "num") {
          history.innerHTML += getNum(result.innerHTML) + opr.value;
          result.innerHTML = "";
        } else if (isResult === "operate") {
          history.innerHTML = history.innerHTML.slice(0, -1) + opr.value;
        } else if (isResult === "equal") {
          history.innerHTML = getNum(result.innerHTML) + opr.value;
          result.innerHTML = "";
        }
        isResult = "operate";
        counter = "";
        break;
    }
    fontShrink();
  });
});

function fontShrink() {
  if (result.innerHTML.length > 22) {
    result.innerHTML = Number(getNum(result.innerHTML)).toExponential(3);
  } else if (result.innerHTML.length >= 14) {
    result.style.fontSize = "24px";
  } else {
    result.style.fontSize = "2rem";
  }
}
