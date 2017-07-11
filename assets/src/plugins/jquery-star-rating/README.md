[jQuery Star Rating Plugin](http://irfandurmus.com/projects/jquery-star-rating-plugin/) 
======================================================================================

How to use 
--------------------------------------
Detailed [documentation](http://irfandurmus.com/projects/jquery-star-rating-plugin/) and working [demo here](http://irfandurmus.com/projects/jquery-star-rating-plugin/).

### Example HTML
    <div class="container">
        <input type="radio" name="example" class="rating" value="1" />
        <input type="radio" name="example" class="rating" value="2" />
        <input type="radio" name="example" class="rating" value="3" />
        <input type="radio" name="example" class="rating" value="4" />
        <input type="radio" name="example" class="rating" value="5" />
    </div>

### Simple usage
    $('.container').rating();

### Using with callback method 
    $('.container').rating(function(vote, event){
        // console.log(vote, event);
    });

### Example of using ajax
    $('.container').rating(function(vote, event){
        // write your ajax code here
        // For example;
        // $.get(document.URL, {vote: vote});
    });



