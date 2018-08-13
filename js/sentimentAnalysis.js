$("#loader").css("display","none");
var pastedNews = document.getElementById('pastedNews');
var sentimentResult = document.getElementById('sentimentResult');


function checkBtn(){
  disable();
  if(pastedNews.value == ""){
    $("#pastedNews").removeClass("border-3 border-success");
    $("#pastedNews").addClass("border-3 border-danger");
  }else {
    $("#pastedNews").removeClass("border-3 border-danger");
    $("#pastedNews").addClass("border-3 border-success");

    $.ajax({
      url: 'getSentimentResult',
      type: 'POST',
      data: {news: pastedNews.value},
      success: function(aResult){
        enable();
        var result = JSON.parse(aResult);
        if(result.result == "1"){
          sentimentResult.innerHTML = "positive";
          $("#sentimentResult").removeClass("text-success");
          $("#sentimentResult").removeClass("text-danger");
          $("#sentimentResult").removeClass("text-primary");
          $("#sentimentResult").addClass("text-success");
        }else if(result.result == "0"){
          sentimentResult.innerHTML = "neutral";
          $("#sentimentResult").removeClass("text-success");
          $("#sentimentResult").removeClass("text-danger");
          $("#sentimentResult").removeClass("text-primary");
          $("#sentimentResult").addClass("text-primary");
        }else if(result.result == "-1"){
          sentimentResult.innerHTML = "negative";
          $("#sentimentResult").removeClass("text-success");
          $("#sentimentResult").removeClass("text-danger");
          $("#sentimentResult").removeClass("text-primary");
          $("#sentimentResult").addClass("text-danger");
        }else {
          alert('cannot connect to sentiment analysis engine')
        }

      },
      error: function(jqXHR,exception){
        if (jqXHR.status === 0) {
              alert('Not connect.\n Verify Network.');
          } else if (jqXHR.status == 404) {
              alert('Requested page not found. [404]');
          } else if (jqXHR.status == 500) {
              alert('Internal Server Error [500].');
          } else if (exception === 'parsererror') {
              alert('Requested JSON parse failed.');
          } else if (exception === 'timeout') {
              alert('Time out error.');
          } else if (exception === 'abort') {
              alert('Ajax request aborted.');
          } else {
              alert('Uncaught Error.\n' + jqXHR.responseText);
          }
      }
    });
}
}
function clearBtn(){
      sentimentResult.value = "";
      pastedNews.value ="";
      $("#pastedNews").removeClass("border-3 border-danger border-success");
}

function enable(){
  setTimeout(function(){
    $("#checkBtn").removeAttr("disabled");
    $("#clearBtn").removeAttr("disabled");
    $("#pastedNews").removeAttr("readonly");
    $("#loader").css("display","none");
  }, 800);
  $("#pastedNews").removeClass("border-3 border-danger border-success");
}

function disable(){
  $("#pastedNews").attr("readonly","true");
  $("#checkBtn").attr("disabled","true");
  $("#clearBtn").attr("disabled","true");
  $("#loader").css("display","block");
}
