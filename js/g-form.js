$((function () {
      $(".g-form").submit(function (event) {
        event.preventDefault();
  
        // Ссылка, которую получили на этапе публикации приложения
        let appLink =
          "https://script.google.com/macros/s/AKfycbxx19zTVHyLb7T9pHHc8hXtQc8boDHKNGGyO4bIdB8yzfjEMBBvT4iYAjwWCApHNOCnmA/exec";
  
        // Id текущей формы
        let form = $("#" + $(this).attr("id"))[0];
  
        // FormData
        let fd = new FormData(form);
  
        $.ajax({
          url: appLink,
          type: "POST",
          data: fd,
          processData: false,
          contentType: false,
        })
      });
    })(jQuery));
