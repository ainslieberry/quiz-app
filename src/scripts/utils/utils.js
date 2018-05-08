var Utils = {
    "optionsModel": {
        "category": "",
        "type": "",
        "difficulty": "",
        "amount": "",
        "token": ""
    },

    "populateCategories": function () {

        var categories = this.referenceData.categories;

        for (var i = 0; i < categories.length; i++) {
            $('select#categories').append($('<option></option>')
                .val(categories[i].id)
                .html(categories[i].name));
            //console.log(categories[i].id)
            //console.log(categories[i].name)
        }
    },

    "populateDifficulties": function () {

        var difficulties = this.referenceData.difficulties;

        for (var i = 0; i < difficulties.length; i++) {
            $('select#difficulty').append($('<option></option>')
                .val(difficulties[i].value)
                .html(difficulties[i].name));
        }
    },

    "populateType": function () {

        var type = this.referenceData.type;

        for (var i = 0; i < type.length; i++) {
            $('select#type').append($('<option></option>')
                .val(type[i].value)
                .html(type[i].name));
        }
    },

    "referenceData": {

        "difficulties": [
            {
                "value": "",
                "name": "Any"
            },
            {
                "value": "easy",
                "name": "Easy"
            },
            {
                "value": "medium",
                "name": "Medium"
            },
            {
                "value": "hard",
                "name": "Hard"
            }
        ],

        "type": [
            {
                "value": "",
                "name": "Any"
            },
            {
                "value": "multiple",
                "name": "Multiple Choice"
            },
            {
                "value": "boolean",
                "name": "True/False"
            },
        ],

        "categories": [

            {

                "id": 9,

                "name": "General Knowledge"

            },

            {

                "id": 10,

                "name": "Entertainment: Books"

            },

            {

                "id": 11,

                "name": "Entertainment: Film"

            },

            {

                "id": 12,

                "name": "Entertainment: Music"

            },

            {

                "id": 13,

                "name": "Entertainment: Musicals & Theatres"

            },

            {

                "id": 14,

                "name": "Entertainment: Television"

            },

            {

                "id": 15,

                "name": "Entertainment: Video Games"

            },

            {

                "id": 16,

                "name": "Entertainment: Board Games"

            },

            {

                "id": 17,

                "name": "Science & Nature"

            },

            {

                "id": 18,

                "name": "Science: Computers"

            },

            {

                "id": 19,

                "name": "Science: Mathematics"

            },

            {

                "id": 20,

                "name": "Mythology"

            },

            {

                "id": 21,

                "name": "Sports"

            },

            {

                "id": 22,

                "name": "Geography"

            },

            {

                "id": 23,

                "name": "History"

            },

            {

                "id": 24,

                "name": "Politics"

            },

            {

                "id": 25,

                "name": "Art"

            },

            {

                "id": 26,

                "name": "Celebrities"

            },

            {

                "id": 27,

                "name": "Animals"

            },

            {

                "id": 28,

                "name": "Vehicles"

            },

            {

                "id": 29,

                "name": "Entertainment: Comics"

            },

            {

                "id": 30,

                "name": "Science: Gadgets"

            },

            {

                "id": 31,

                "name": "Entertainment: Japanese Anime & Manga"

            },

            {

                "id": 32,

                "name": "Entertainment: Cartoon & Animations"

            }

        ]
    },

    "populateResponse": function () {
        console.log('Utils.questionModel', Utils.questionsModel);
        //Loop through questionsModel:
        for (var i = 0; i < Utils.questionsModel.length; i++) {
            // Populate questions on Screen:
            //create jquery questionContainer and answersContainer to reference html element.
            var quizContainer = $('#quiz-container');
            var question = $('<p>' + Utils.questionsModel[i].question + '</p>');
            var answers = $('<ul></ul>');
            var questionId = i;
            Utils.questionsModel[i].id = questionId;

            //Loop through answers for each answer

            for (var j = 0; j < Utils.questionsModel[i].answers.length; j++) {
                var answerInput = $('<input></input>');
                var inputId = 100 * i + j;
                answerInput.attr('id', inputId);
                answerInput.attr('type', 'radio');
                answerInput.attr('name', questionId);
                answerInput.val(Utils.questionsModel[i].answers[j]);
                var answerLabel = $('<label></label>');
                answerLabel.text(Utils.questionsModel[i].answers[j]);
                answerLabel.attr('for', inputId);
                var answer = $('<li></li>');
                answer.append(answerInput);
                answer.append(answerLabel);
                answers.append(answer);
            }
            //combine questions and answers into order an print
            quizContainer.append(question).append(answers);
        }
        console.log('questionsModel', Utils.questionsModel);
    },
    //submit button event handeler
    "submit": function () {
        //get selected answers from user
        var userCorrectScore = 0;
        for (var i = 0; i < Utils.questionsModel.length; i++) {
            var questionId = Utils.questionsModel[i].id;
            var correctId = Utils.questionsModel[i].correctAnswer;
            var selectedAnswer = $('#quiz-container [name=' + questionId + ']:checked').val();
            if (selectedAnswer === Utils.questionsModel[i].correctAnswer) {
                $('#quiz-container [name=' + questionId + ']:checked').siblings('label').addClass('right-answer');
                userCorrectScore++;
                $('#correct-score').html(userCorrectScore);
                console.log('correct', questionId);
            } else if (selectedAnswer !== Utils.questionsModel[i].correctAnswer) {
                var answeredWrong = $('#quiz-container [name=' + questionId + ']:checked').siblings('label').addClass('wrong-answer');
                console.log('incorrect', questionId, answeredWrong);
            }
            console.log('selectedAnswer', selectedAnswer);
        };

    },
    "questionsModel": [
    ],

    "getToken": function () {

        //check to see if token exists
        if (!localStorage.getItem('tokenKey')) {

            //if token does not exist get token
            return $.ajax({
                "url": "https://opentdb.com/api_token.php?command=request"
            }).then(function (response) {
                if (response.response_code === 0) {
                    //assign token return to localStorage
                    localStorage.setItem('tokenKey', response.token);
                    return response.token;
                }
            });
        } else {
            //if token exists then return token from local storage
            return (async function emptyPromise() {
                return localStorage.getItem('tokenKey');
            })();
            // //return new Promise( function(resolve, reject) {
            //     resolve('test');
            // });
        }
    },

    "getQuestions": function (token) {
        console.log('token', token);
        
        Utils.optionsModel.amount = $('#amount').val();
        Utils.optionsModel.category = $('#categories').val();
        Utils.optionsModel.difficulty = $('#difficulty').val();
        Utils.optionsModel.type = $('#type').val();
        Utils.optionsModel.token = token;

        console.log('Utils.optionsModel', Utils.optionsModel);
        $.ajax({
            "url": "https://opentdb.com/api.php?amount=10",
            "data": Utils.optionsModel
        }).then(function populateQuestionsModel(response) {
            console.log('response', response);
            for (var i = 0; i < response.results.length; i++) {

                var answers = response.results[i].incorrect_answers;

                answers.push(response.results[i].correct_answer);

                answers.sort(function () {
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
    }

};


