var range = ["AKM.png", "Groza.png", "QBZ.png", "Scar-L.png", "AUG.png", "M416.png"];

var limit = 6;

var cards =[];
var positionLeft=[];

var oneVisible = false;
var lock=false;
var activeCard;
var pairsLeft = limit;
var counter=0;

$('#button input').click(function(){
    $('#button').css('display', 'none');
    $('#board').css('display', 'block');
    oneVisible = false;
    lock=false;
    pairsLeft = 6;
    counter=0;
    for(i=0; i<limit*2; i++){
        $('#card'+i).css('background-image', 'url(img/memo/back.png)');
        $('#card'+i).addClass('card');
        $('#card'+i).removeClass('cardActive');
        $('#card'+i).css('opacity', 1);    
    }
    $('#score').html("<p>Your score: "+ counter +"</p>");
    $('#finalScore').css('display', 'none');
    for(i=0; i<limit; i++)
        positionLeft[i]=2;
    cardsShuffling();
});

function cardsShuffling(){
    var i=0;
    while(i<12){
        var number = Math.floor((Math.random() * limit));
        if(positionLeft[number]>0){
            positionLeft[number]--;
            cards[i]=range[number];
            i++;
        }
    }
}

$('.card').click(function(){
    var my_id=this.id;
    my_nr = my_id.substr(4, my_id.length - 1);
    revealCard(my_nr);
});


function revealCard(nr){
    var thisOpacity = $('#card'+nr).css('opacity');

    if(thisOpacity!=0 && lock==false && nr!=activeCard){

        lock=true;
        var my_img="url(img/memo/"+cards[nr]+")";
        $('#card'+nr).css('background-image', my_img);
        $('#card'+nr).addClass('cardActive');
        $('#card'+nr).removeClass('card');
        if(oneVisible==false){
            oneVisible=true;
            activeCard=nr;
            lock=false
        }
        else{
            if(cards[nr]==cards[activeCard]){
                setTimeout(function(){
                    $('#card'+nr).css('opacity',0);
                    $('#card'+activeCard).css('opacity',0);
                    
                    pairsLeft--;
                    if(pairsLeft==0){
                        //$("#memoHeader").css('display', 'none');
                        $("#button").css('display', 'block');
                        $('#finalScore').css('display', 'block');
                        $('#finalScore').html("<h1>Congrats! You won in " + counter + " turns</h1>");
                        $('#board').css('display', 'none');
                    }
                    lock=false;
                }, 1000);
            }
            else{
                setTimeout(function(){
                    $('#card'+nr).css('background-image', 'url(img/memo/back.png)');
                    $('#card'+nr).addClass('card');
                    $('#card'+nr).removeClass('cardActive');

                    $('#card'+activeCard).css('background-image', 'url(img/memo/back.png)');
                    $('#card'+activeCard).addClass('card');
                    $('#card'+activeCard).removeClass('cardActive');

                    lock=false;
                }, 2000);
            }
            counter++;
            $('#score').html("<p>Your score: "+ counter +"</p>");
            oneVisible=false;
        }
    }
};
