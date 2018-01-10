var $myprofil = $("#myprofil");
var $mywall = $("#mywall");
var $content_wall = $("#content_wall");
var $content_profil = $("#content_profil");
var $profil_form = $("#profil_form");
var $wall_form = $("#wall_form");
var $errors = $(".error");
var $articles = $("#articles");
var $error_article = $("#error_article");

var $menu =$(".menu");

var list_articles = [];

var $title_change = $(".title");
var $content = $('.content');

var $file = $("#file");

var $confirm_profil = $("#confirm_profil");

var $title=$("#title");
var $description=$("#description");

var $name = $("#name");
var $firstname = $("#firstname");
var $address = $("#address");
var $tel = $("#tel");
var $mail = $("#mail");
var $birth = $("#birth");

var profil = {
        name: "",
        firstname: "",
        address: "",
        tel: "",
        mail: "",
        birth:"",


};

var $ranges_menu = $("#container-menu input[type=range]");
var $color_rect_menu = $("#color-rect-menu");

var $ranges_fond = $("#container-fond input[type=range]");
var $color_rect_fond = $("#color-rect-fond");

var $range_police = $("#container-police input[type=range]");

var $articles_position = $("#articles-position");

var $red_menu = $("#red_menu");
var $green_menu = $("#green_menu");
var $blue_menu = $("#blue_menu");

var $red_fond = $("#red_fond");
var $green_fond = $("#green_fond");
var $blue_fond = $("#blue_fond");

var $police_size_val = $("#police_size_val");

var save_color_menu = function() {
        localStorage.setItem("color_menu", $menu.css("background-color"));      
}

var save_color_fond = function() {
        localStorage.setItem("color_fond", $content_profil.css("background-color"));      
}
        
var save_article = function(array, val) {

       array.push(val);
       localStorage.setItem("articles", JSON.stringify(array));

};

var save_position = function() {
        localStorage.setItem("justify-content",  $articles_position.val());   
}

var save_police = function() {
        localStorage.setItem("font-size",  $range_police.val());  
}

var restore_position = function() {
        var article_pos = localStorage.getItem("justify-content");
        if (article_pos) {
                $articles.css ("justify-content", article_pos);
        }
}

var restore_police = function() {
        var police = localStorage.getItem("font-size");
        if (police) {
                $police_size_val.text(police);
                $content_profil.css("font-size", police+"px");
                $content_wall.css("font-size", police+"px");
                $menu.css("font-size", police+"px");
        }
}

var restore_color_menu = function() {
        var stocked_color_menu = localStorage.getItem("color_menu");
        if (stocked_color_menu) {
                $menu.css("background-color", stocked_color_menu);
                $color_rect_menu.css("background-color", stocked_color_menu);

                var str_red = stocked_color_menu;
                str_red = str_red.replace(/rgb\(/, "");
                str_red = str_red.replace(/,.*$/, "");
                $red_menu.text(str_red);
                
                var str_green = stocked_color_menu;
                str_green = str_green.replace(/rgb\([\d]{1,3}, /, "");
                str_green = str_green.replace(/,.*\)$/, "");
                $green_menu.text(str_green);

                var str_blue = stocked_color_menu;
                str_blue = str_blue.replace(/rgb\([\d]{1,3}, [\d]{1,3}, /, "");
                str_blue = str_blue.replace(/\)$/, "");
                $blue_menu.text(str_blue);
        }
}

var restore_color_fond = function() {

        var stocked_color_fond = localStorage.getItem("color_fond");
        if (stocked_color_fond) {
                $content_profil.css("background-color", stocked_color_fond);
                $content_wall.css("background-color", stocked_color_fond);
                $color_rect_fond.css("background-color", stocked_color_fond);

                var str_red = stocked_color_fond;
                str_red = str_red.replace(/rgb\(/, "");
                str_red = str_red.replace(/,.*$/, "");
                $red_fond.text(str_red);
                
                var str_green = stocked_color_fond;
                str_green = str_green.replace(/rgb\([\d]{1,3}, /, "");
                str_green = str_green.replace(/,.*\)$/, "");
                $green_fond.text(str_green);

                var str_blue = stocked_color_fond;
                str_blue = str_blue.replace(/rgb\([\d]{1,3}, [\d]{1,3}, /, "");
                str_blue = str_blue.replace(/\)$/, "");
                $blue_fond.text(str_blue);
        }
}

var restore_articles = function() {
        var retrieved_articles= localStorage.getItem("articles");
        var full_articles = JSON.parse(retrieved_articles);
        if (full_articles) {
                for (article of full_articles) {

                        save_article(list_articles, article);
                        var $article = $(article);
                        $articles.hide().append($article).fadeIn(500);
                        var color = rand (0, colors.length - 1);
                        $article.css("border", "1px solid black");
                        $article.css("border-radius", (color*4)+"px" );
                }
        }      
}



var rand = function (min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }

var colors = ["red", "lightblue", "lightgrey", "purple", "orange", "brown", "yellow", "green", "pink"];


var retrieved_profil = localStorage.getItem("profil");
if(retrieved_profil) {
        var full_profil = JSON.parse( retrieved_profil );
        profil = full_profil;
        $name.val(profil.name);
        $firstname.val(profil.firstname);
        $address.val(profil.address);
        $tel.val(profil.tel);
        $mail.val(profil.mail);
        $birth.val(profil.birth);     

}


restore_color_fond();
restore_color_menu();
restore_police();
restore_position();
restore_articles();


$myprofil.click(function() { 

        $content_wall.css("display", "none");
        $content_profil.css("display", "block");
});


$mywall.click(function() { 

        $content_wall.css("display", "block");
        $content_profil.css("display", "none");
});

$profil_form.submit(function( event ) { 
        

        var error = 0;
        $errors.each(function() {
                $(this).text("");
                
        });

        event.preventDefault();
        
        if ($name.val() == "") {
                $(this).children().children("p:first").text("Au moins un caractère pour le nom !");
                error++;
        }
        if ($firstname.val() == "" ) {
                $(this).children().children("p").eq(1).text("Au moins un caractère pour le prénom !");
                error++;
        }

        if ( $address.val() == "" ) {
                $(this).children().children("p").eq(2).text("L'adresse ne doit pas être vide !");
                error++;
        }
        if ( $tel.val() == "" || !$tel.val().match(/[0-9-()+]{3,20}/) ) {
                $(this).children().children("p").eq(3).text("Entre 3 et 20 chiffres !");
                error++;
        }
        if ($mail.val() == "" || !$mail.val().match(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i) ) {
                $(this).children().children("p").eq(4).text("Mauvais format d'adresse mail !");
                error++;
        }
        if ($birth.val() == "" || $birth.val().match('^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)dd$')) {
                $(this).children().children("p").eq(5).text("Veuillez sélectionner votre date de naissance !");
                error++;
        }

        if (error > 0 ) {
                return;
        }

        profil.name = $name.val();
        profil.firstname = $firstname.val();
        profil.address = $address.val();
        profil.mail = $mail.val();
        profil.tel = $tel.val();
        profil.birth = $birth.val();

        $confirm_profil.text("Profil enregistré avec succès !");

        var str_profil = JSON.stringify(profil);
        localStorage.setItem("profil", str_profil);

});



$wall_form.submit(function( event ) { 
        
        event.preventDefault();

        var bool = 0;
        var image = $file.val();
        var title = $title.val();
        var description = $description.val();
        $error_article.text("");

        if (title == "" || description == "" || profil.name == "" || profil.firstname == "" ||
         profil.address == "" || profil.birth == "" || profil.mail == "" || profil.tel == "" || image == "") {
                $error_article.text("Veuillez completer votre profil, mettre un titre, une description et une image avant de publier un article !")
                return;
        }

        var $alltitles = $articles.children().children("h4");
        $alltitles.each(function() {

                var alltitle = $(this).text();
                if (alltitle.toUpperCase() == title.toUpperCase()) {
                        bool = 1;
                }
        });
        if (bool == 1) {
                return;
        }

        description = description.replace(/\n/g, "");
      
        var article = "<div class='article'>";
        article += "<span class='suppr'>X</span>";
        article += "<h5 class='autor'>"+profil.name+" "+profil.firstname+"</h5>";
        article += "<h4 class='title'>"+title+"</h4>";
        article += "<p class='content'>"+description+"</p>";
        article += "<img class='image' src=img/"+image+">";
        article += "</div>";

        save_article(list_articles, article);

        var $article = $(article);

        $articles.hide().append($article).fadeIn(500);

        var color = rand (0, colors.length - 1);
        $article.css("border", "1px solid black");
        $article.css("border-radius", (color*4)+"px" );

        $title.val("");
        $description.val(""); 


});


$articles.on("click", ".article span", function(){


        var title = $(this).parent().children("h4").text();
        var description = $(this).parent().children("p").text();
        


        var retrieved_articles= localStorage.getItem("articles");
        var full_articles = JSON.parse(retrieved_articles);
       
        for (article of full_articles) {
                   
                if (article.indexOf(title) != -1 && article.indexOf(description) != -1 ) {
                        full_articles.splice(full_articles.indexOf(article), 1);
                }
        }  

        localStorage.setItem("articles", JSON.stringify(full_articles));

        $(this).parent().remove();
        
      
        
});




//Pour le menu latéral

var $close = $(".close");
var $mynavigation = $("#mynavigation");
var $params = $("#params");


$close.click(function () {

        $mynavigation.css("width", "0");
});


$content_wall.click(function() {

        $mynavigation.css("width", "0");

});

$content_profil.click(function() {
        
        $mynavigation.css("width", "0");
        
});

$menu.click(function() {
        
        $mynavigation.css("width", "0");
        
});

$params.click(function() {

        $mynavigation.css("width", "300px");

});

var color = {
    red: 0,
    blue: 0,
    green: 0,
    getRGB: function() {

        var rgb = "rgb(";
        rgb += this.red;
        rgb += ", ";
        rgb += this.green;
        rgb += ", ";
        rgb += this.blue;
        rgb += ")";

        return rgb;

    }
}

$ranges_menu.change(function(){
    var classe = $(this).attr("class");

    color[classe] = $(this).val();

    if (classe == "red") {

        $red_menu.text(color[classe]);
    }
    else if (classe == "green") {
        $green_menu.text(color[classe]);
    }
    else {
        $blue_menu.text(color[classe]);
    }

    $color_rect_menu.css("background-color", color.getRGB());
    $menu.css("background-color", color.getRGB());
    save_color_menu();

});

$ranges_fond.change(function(){
        var classe = $(this).attr("class");
    
        color[classe] = $(this).val();

        if (classe == "red") {

                $red_fond.text(color[classe]);
            }
            else if (classe == "green") {
                $green_fond.text(color[classe]);
            }
            else {
                $blue_fond.text(color[classe]);
            }
    
        $color_rect_fond.css("background-color", color.getRGB());
        $content_wall.css("background-color", color.getRGB());
        $content_profil.css("background-color", color.getRGB());
        save_color_fond();
    
    });


$range_police.change(function() {

        $police_size_val.text($(this).val());

        $content_profil.css("font-size", $(this).val()+"px");
        $content_wall.css("font-size", $(this).val()+"px");
        $menu.css("font-size", $(this).val()+"px");
        save_police();

});

$articles_position.change(function() {

        var pos = $("select[name='liste'] > option:selected").val();
        $articles.css("justify-content", pos);
        save_position();
});
