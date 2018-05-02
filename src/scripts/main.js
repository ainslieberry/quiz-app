$(document).ready(function() {
    Utils.populateCategories();
    Utils.populateDifficulties();
    Utils.populateType();

    $('#submit').click(Utils.submit);

    $('#get-button').click(function() {
        Utils.optionsModel.amount = $('#amount').val();
        Utils.optionsModel.category = $('#categories').val();
        Utils.optionsModel.difficulty = $('#difficulty').val();
        Utils.optionsModel.type = $('#type').val();

        console.log('Utils.optionsModel', Utils.optionsModel);
        $.ajax({
            "url": "https://opentdb.com/api.php?amount=10",
            "data": Utils.optionsModel
        }).then(function populateQuestionsModel(response) {
            console.log('response', response);
            for(var i = 0; i < response.results.length; i++) {

                var answers = response.results[i].incorrect_answers;

                answers.push(response.results[i].correct_answer);

                answers.sort(function() {
                    return 0.5 - Math.random();
                });

                Utils.questionsModel.push({
                    "category": response.results[i].category,
                    "type": response.results[i].type,
                    "difficulty": response.results[i].difficulty,
                    "question": response.results[i].question,
                    "answers": answers,
                    "correctAnswer": response.results[i].correct_answer
                });
            };
        }).then(Utils.populateResponse);
    });
});
