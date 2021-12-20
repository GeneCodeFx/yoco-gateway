var yoco = new window.YocoSDK({
  // publicKey: 'pk_test_ed3c54a6gOol69qa7f45', test anonymous
  // publicKey: "pk_test_8f136b99Kw2GK5Vd4bb4", //test personal
  publicKey: "pk_live_383mfmmvdrbmumKw2GKtggddyj44", //live personal
});
document.addEventListener("message", function (data) {
  yoco.showPopup({
    amountInCents: data.data,
    currency: "ZAR",
    name: "Name Of Your App",
    description: "Payment Descriptions",
    callback: function (result) {
      // This function returns a token that your server can use to capture a payment

      if (result.error) {
        // window.location.href = "failed.html";
        const errorMessage = result.error.message;
        const messageToPost = {
          status: "error",
          errorMessage: errorMessage,
        };
        window.ReactNativeWebView.postMessage(JSON.stringify(messageToPost));
      } else {
        const messageToPost = {
          status: "success",
          token: result.id,
        };
        // window.location.href = "sucessful.html";
        window.ReactNativeWebView.postMessage(JSON.stringify(messageToPost));
      }
      // In a real integration - you would now pass this chargeToken back to your
      // server along with the order/basket that the customer has purchased.

      //LOL, But smart me proccesses this token in the front-end because I am lazy to learn back-end NodeJs and hosting a server online
      //Not only am i lazy but it will also take a lot of time and I will have to pay for hosting a server
      //Just not ready, will try it some other time
    },
  });

  setInterval(() => {
    const yocoIsRunning = document.getElementById("CheckoutIframe"); //will return null if the pop up is closed
    if (yocoIsRunning == null) {
      //yoco pop up is closed
      const messageToPost = {
        status: "error",
        errorMessage: "Payment was not completed",
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(messageToPost));
    }
  }, 5000);
});

// window.onload = function(){
// //   equeivalent to useEffect or componentDidMount

// }
