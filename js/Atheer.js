//const cardsList =  ['fa fa-diamond','fa fa-diamond','fa fa-paper-plane-o','fa fa-paper-plane-o', 'fa fa-anchor','fa fa-anchor','fa fa-bolt','fa fa-bolt','fa fa-cube','fa fa-cube','fa fa-leaf','fa fa-leaf','fa fa-bicycle','fa fa-bicycle','fa fa-bomb','fa fa-bomb'];
const cardsList =  ['fa fa-diamond','fa fa-paper-plane-o','fa fa-anchor','fa fa-bolt','fa fa-cube','fa fa-leaf','fa fa-bicycle','fa fa-bomb'];
const doubledArray = cardsList.concat(cardsList);

let open = [];
//let cardshuffle =[];
var Counter = 0;
let mat = 0;
let second = 0, minute = 0; hour = 0;
let interval;
let str = 3 ;
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
  }

$( document ).ready(function begin() {  // shuffle and assign in html
    const cardshuffle =  shuffle(doubledArray);
    for (let i = 0; i < cardshuffle.length; i++) {
        $('.card').eq(i).find('i').addClass(cardshuffle[i]);
        $('.card').eq(i).find('i').removeClass("match show open");
    }
          $('.moves').text(0);
          mMatch = 0;
          myGame();
          timer();
  });
function myGame(){
    open = [];
  $('.card').bind('click', function () {
      if ($(this).hasClass('show') || $(this).hasClass('match')) { return true; }
      open.push($(this).children().attr('class')); // add  <i class= "...."> in array
      $(this).addClass('open show');
      if (open.length === 2) {
            console.log(open.length);
        if (open[0] === open[1]) { //check
            ++Counter;
            console.log(open[0]);
            console.log(open[1]);
            $('.card').filter($('.open')).addClass('match');
          setTimeout(function() {
              $('.card').filter($('.open')).removeClass('open show');
            }, 400);
          open = [];
        }else if (open[0] !== open[1])   {
          ++Counter;
          console.log(open[0]);
          console.log(open[1]);
          setTimeout(function() {
              $('.card').filter($('.open')).removeClass('open show');
            }, 400);
          open = [];
        }
      // change moves

        $('.moves').text(Counter); //Star Rating
        if (Counter > 18 && Counter< 20){
          $('.s1').hide();
          -- str;
        }
        if (Counter > 25 && Counter< 30){
          $('.s2').hide();
          --str;
        }
        mat =  $('.match').length;
        done(mat); //  wins the game
      }


    });
  }
function done(mat){
  if (mat === 16 ){
      swal({
          title: "Good job!",
          text: 'You Done in \n  Time: ' +minute +' : ' +second + '\n Moves :  ' +  Counter+ ' \n star rating : ' + str +' \n play again',
          icon: "success",
          })
          .then((value) => {
            location.reload();
            });
          }
        }
  // restart button
$('.restart').click(function(event) {
    location.reload();
  });
function timer(){// displayed timer in www.w3schools.com
  interval = setInterval(function(){
  $(".timer").html("&nbsp;Time ("+minute+":"+second+")&nbsp;");
    second++;
  if(second == 60){
        minute++;
        second=0;
      }
    },1000);
  }
