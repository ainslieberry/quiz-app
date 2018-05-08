$(document).ready(function () {
    Utils.populateCategories();
    Utils.populateDifficulties();
    Utils.populateType();

    $('#submit').click(Utils.submit);

    $('#get-button').click(function () {

        Utils.getToken().then(Utils.getQuestions);
    });
});
