var Utils = {
    "optionsModel": {
        "category": "",
        "type": "",
        "difficulty": "",
        "amount": ""
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
        for (var i = 0; i < Utils.questionsModel.length; i++) {
            var questionId = Utils.questionsModel[i].id;
            var correctId = Utils.questionsModel[i].correctAnswer;
            var correctAnswer = selectedAnswer === Utils.questionsModel[i].correctAnswer;
            var incorrectAnswer = selectedAnswer != Utils.questionsModel[i].correctAnswer;
            var selectedAnswer = $('#quiz-container [name=' + questionId + ']:checked').val();
            if (selectedAnswer === Utils.questionsModel[i].correctAnswer) {
                console.log('correct', questionId);
            }else(selectedAnswer === incorrectAnswer); {
                console.log('incorrect', questionId);
            }
            console.log('selectedAnswer', selectedAnswer);
        }
        var showCorrect = $('#quiz-container' + correctAnswer).addClass("answeredRight");
        var showIncorrect = $('#quiz-container' + incorrectAnswer).addClass("answeredWrong");
        console.log('correct', showCorrect);
        console.log('incorrect', showIncorrect);

        //$('#quiz-container [name=' + correctAnswer])

        //store selected answers

        //compare selected answers to correct answers

        //var for correctAnswers
        //for correct answers
        console.log('submit');
    },

    "questionsModel": [
    ],
};


