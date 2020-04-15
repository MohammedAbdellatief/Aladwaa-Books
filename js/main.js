var controller = new ScrollMagic.Controller();
var book = $('.stand_book');
var layers = $('.layers_cont');
var booksContainer = $('.books_container');
var bookUnit = $('.book');
var vertLayer = $('.layers > div');

if( !/Android|webOS|iPhone|iPod|iPad|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

// init controller


    //exams
    var exams = {score:0},
        examsCont = document.querySelector(".exams"),
        examsVal = examsCont.innerHTML;
    //test
    var test = { score: 0 },
        testCont = document.querySelector(".test"),
        testVal = testCont.innerHTML;
    //quiz
    var quiz = { score: 0 },
        quizCont = document.querySelector(".quiz"),
        quizVal = quizCont.innerHTML;



// change behaviour of controller to animate scroll instead of jump
    controller.scrollTo(function (newpos) {
        TweenMax.to(window, 2, {scrollTo: {y: newpos},ease: Power3.easeInOut});
    });

//  bind scroll to anchor links
    $(document).on("click", "a[href^=#]", function (e) {
        var id = $(this).attr("href");
        if ($(id).length > 0) {
            e.preventDefault();

            // trigger scroll
            controller.scrollTo(id);

            // if supported by the browser we can even update the URL.
//        if (window.history && window.history.pushState) {
//            history.pushState("", document.title, id);
//        }
        }
    });


// intro animation ===========================
    function intro() {
        var tl = new TimelineMax();
        tl.set(booksContainer, { display: 'block'})
            .from(booksContainer, 2, { left:'150%', marginLeft:0, ease: Power4.easeInOut})
            .to(booksContainer, 5, { left:-1100, marginLeft:0, ease: Sine.easeInOut})
            .set(booksContainer, { marginLeft:0})
        ;
        return tl;
    }
    function repeated() {
        //repeated animation
        var tl = new TimelineMax(
            {repeat: -1}
        );
        tl.to(booksContainer, 10, { left:0, ease: Sine.easeInOut})
        tl.to(booksContainer, 10, { left:-1100, ease: Sine.easeInOut})
        ;
        return tl;
    }

    var master = new TimelineMax();
    master.add( intro())
    master.add( repeated());

    booksContainer.on('mouseenter', function(){
        master.pause();
    });
    booksContainer.on('mouseleave', function(){
        master.resume();
    });
    //sec 1 books hover to activate
    bookUnit.hover(function(){
        $(this).addClass('active');
    },function(){
        $(this).removeClass('active');
    })
    bookUnit.find('a').on('click', function(e){
        e.preventDefault();
    });


    //second sec open book =============================
    var openBook = TweenMax.set(book,{className:"+=opened"});
    // build scene 2
    var scene2 = new ScrollMagic.Scene({
        triggerElement: "#second_sec"
    })
        .setTween(openBook)
        .addTo(controller);


    //third sec book steps ==============================
    var bookLayes = TweenMax.set(layers,{className:"+=expand"});
    // build scene 3
    var scene3 = new ScrollMagic.Scene({
        triggerElement: "#third_sec"
    })
        .setTween(bookLayes)
        .addTo(controller);

    $(".steps li").on("mouseover mouseout",function () {
        var $this = $(this);
        var stepId = $this.attr("data-step-id");
        var step = $("[data-step-id="+stepId+"]");
        var layer = $('.layer');
        layer.toggleClass('translucent')
        step.toggleClass('highlight');
    });

    //fourth sec layers ==============================
    var screenLayers = TweenMax.staggerFrom(vertLayer,.7,{opacity:0, left:'+=40'},.2);
    // build scene 3
    var scene3 = new ScrollMagic.Scene({
        triggerElement: "#fourth_sec"
    })
        .setTween(screenLayers)
        .addTo(controller);


    //counters animation for exams========================
    function updateExams() {
        examsCont.innerHTML = exams.score;
    }
    var countExams = TweenMax.to(exams, 1, {score:examsVal, roundProps:"score", onUpdate:updateExams,ease: Expo.easeOut});
    var scene5 = new ScrollMagic.Scene({
        triggerElement: ".fifth_sec"
    })
        .setTween(countExams)
        .addTo(controller);



    //counters animation for tests ========================
    function updateTest() {
        testCont.innerHTML = test.score;
    }
    var countTest = TweenMax.to(test, 1, { score: testVal, roundProps: "score", onUpdate: updateTest, ease: Expo.easeOut });
    var scene2 = new ScrollMagic.Scene({
        triggerElement: ".fifth_sec"
    })
        .setTween(countTest)
        .addTo(controller);



    //counters animation for quiz=============================
    function updateQuiz() {
        quizCont.innerHTML = quiz.score;
    }
    var countQuiz = TweenMax.to(quiz, 1, { score: quizVal, roundProps: "score", onUpdate: updateQuiz, ease: Expo.easeOut });
    var scene2 = new ScrollMagic.Scene({
        triggerElement: ".fifth_sec"
    })
        .setTween(countQuiz)
        .addTo(controller);




}
else
{
    TweenMax.set(book,{className:"+=opened"});
    TweenMax.set(layers,{className:"+=expand"});
}