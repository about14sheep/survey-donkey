document.addEventListener('DOMContentLoaded', ()=> {
    
    const optionsContainer = document.getElementById('options-container')
    const typeInput = document.getElementById("question-type")
    const promptInput = document.getElementById("question-text")
    const newQuestionButton = document.getElementById("new-question-button")
    const mChoiceOptionContainer = document.getElementById("multiple-choice-container")
    const optionList = document.getElementById('option-list')
    const surveyPreview = document.getElementById('survey-form')
    const questionTextForm = document.getElementById("question-main-prompt-form")
    const surveyPreviewTitle = document.getElementById("survey-preview-title")
    const opThree = document.getElementById("option-three")
    

    //global variables
    let specs;
    //f()s

    const gatherQuestionSpecs = () => {
        const type = typeInput.value
        const prompt = promptInput.value
        return {type: type, prompt: prompt}
    }

    const createQuestion = async () => {
        const surveyId = document.getElementById('surveyId').value
        const token = document.getElementById('csrfToken').value
        let data = JSON.stringify({
            prompt: specs.prompt,
            questionType: specs.type,
            surveyId: surveyId,
            opOne: specs.opOne,
            opTwo: specs.opTwo,
            opThree: specs.opThree,
            opFour: specs.opFour,
            opFive: specs.opFive
        })
        const create = await fetch(`/surveys/create/${surveyId})`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Csrf-Token": token
            },
            body: data
        })

        promptInput.value = "";
        optionsContainer.classList.add("is-hidden")
        mChoiceOptionContainer.classList.add("is-hidden")
        newQuestionButton.classList.remove("is-hidden")
        specs=""
        renderPreview(surveyId)
    }

    const renderPreview = async (surveyId) => {
        const questions = await fetch(`/surveys/preview/${surveyId})`)
        const gatherQuestions = await questions.json()
        const surveyQuestions = gatherQuestions.map(el => JSON.parse(el))
        createSurveyPreviewElements(surveyQuestions)
    }


    // popUp.addEventListener('close', ()=>{

    // })

    const createSurveyPreviewElements = (questions) => {
        surveyPreview.innerHTML = ""
        surveyPreview.appendChild(surveyPreviewTitle)
        questions.forEach(question => {
            let newQuestionContainer = document.createElement("div");
            newQuestionContainer.classList.add("survey-preview-question-container")
            newQuestionContainer.setAttribute("id",`container-for-question-${question.id}`)
            let newQuestionText = document.createElement("div");
            let newQuestionTextContainer = document.createElement("div");
            newQuestionTextContainer.appendChild(newQuestionText)
            newQuestionTextContainer.classList.add("question-text-and-button-container")
            newQuestionText.classList.add('survey-preview-question-text');
            newQuestionText.innerHTML = question.questionText;
            let editButton = document.createElement("button")
            editButton.classList.add("button","is-dark","is-primary","editButton")
            editButton.innerHTML = "edit"
            editButton.value = question.id
            editButton.style.marginRight = '10px'
            let deleteButton = createDeleteButton(question.id)
            let editButtonHolder = document.createElement("div")
            editButtonHolder.classList.add("edit-button-holder")
            editButtonHolder.appendChild(editButton)
            editButtonHolder.appendChild(deleteButton)
            newQuestionTextContainer.appendChild(editButtonHolder)
            newQuestionContainer.appendChild(newQuestionTextContainer)
            let keys = ['opOne','opTwo','opThree','opFour','opFive']
            keys.forEach(key=>{
                console.log("adsfasjhdfkjhadskfasdfasdf",question[key])
                if (question[key]) {
                    let newOptionText = document.createElement("div")
                    newOptionText.innerHTML = question[key]
                    newOptionText.classList.add('survey-preview-question-option');
                    newQuestionContainer.appendChild(newOptionText)
                }
            })
            surveyPreview.appendChild(newQuestionContainer)
        })
        addEventListenersToSurveyPreview();
        addEventListenersToSurveyDeleteConfirms();
        addEventListenersToSurveyCancelDeletes();
        prepEditButtons();
    }

    // form(action = `surveys/${survey.id}` method = "DELETE")
    // button(class= 'button is-danger' type = 'submit' onclick = "return confirm('Are you sure you want to delete this survey?');") Delete

    const createDeleteButton = (questionId) => {
        const confirmDeleteDiv = document.createElement('div')
        confirmDeleteDiv.classList.add("confirm-delete-div")
        const confirmDeleteButton = document.createElement('button')
        const cancelDeleteButton = document.createElement('button')
        confirmDeleteButton.classList.add("button", "is-dark", "is-danger", "confirm-delete-button","is-hidden")
        confirmDeleteButton.setAttribute('id',`confirm-delete-for-${questionId}`)
        confirmDeleteButton.style.marginRight = '10px'
        cancelDeleteButton.setAttribute('id', `cancel-delete-for-${questionId}`)
        const deleteButton = document.createElement('button')
        deleteButton.classList.add("button", "is-dark", "is-danger", "delete-button")
        deleteButton.setAttribute("id",`${questionId}`)
        cancelDeleteButton.classList.add("button","is-dark","is-warning","cancel-delete-button","is-hidden")
        confirmDeleteButton.innerHTML = "confirm remove"
        deleteButton.innerHTML = "remove"
        cancelDeleteButton.innerHTML = "cancel"
        confirmDeleteDiv.appendChild(confirmDeleteButton)
        confirmDeleteDiv.appendChild(cancelDeleteButton)
        confirmDeleteDiv.appendChild(deleteButton)
        return confirmDeleteDiv
    }

    const addEventListenersToSurveyPreview = () => {
        document.querySelectorAll(".delete-button").forEach( button => {
            button.addEventListener('click',(e)=>{
                e.target.classList.add("is-hidden")
                let confirm = document.getElementById(`confirm-delete-for-${e.target.id}`)
                let cancel = document.getElementById(`cancel-delete-for-${e.target.id}`)
                console.log("hello there")
                confirm.classList.remove("is-hidden")
                cancel.classList.remove("is-hidden")
            })
        }
        )
    }

    const addEventListenersToSurveyDeleteConfirms = () => {
        document.querySelectorAll(".confirm-delete-button").forEach(button => {
            button.addEventListener('click', (e) => {
                e.target.classList.add("is-hidden")
                let id = e.target.id
                id = id.split("-")[3]
                deleteQuestion(id)
            })
        }
        )
    }

    const addEventListenersToSurveyCancelDeletes = () => {
        document.querySelectorAll(".cancel-delete-button").forEach(button => {
            button.addEventListener('click', (e) => {
                e.target.classList.add("is-hidden")
                let id = e.target.id
                id = id.split("-")[3]
                let confirm = document.getElementById(`confirm-delete-for-${id}`)
                confirm.classList.add("is-hidden");
                let dbutton = document.getElementById(`${id}`);
                dbutton.classList.remove("is-hidden")
            })
        }
        )
    }

    deleteQuestion= async (questionId)=>{
        let data = JSON.stringify({
            questionId: questionId
        })
        const token = document.getElementById('csrfToken').value
        const create = await fetch(`/surveys/questions/${questionId})`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Csrf-Token": token
            },
            body: data
        })
        const questionContainer = document.getElementById(`container-for-question-${questionId}`)
        questionContainer.remove()
    }


    newQuestionButton.addEventListener("click", (event)=> {
        typeInput.value= '';
        promptInput.value= '';
        optionsContainer.classList.remove("is-hidden")
        newQuestionButton.classList.add("is-hidden")
        reApplyAutoSelectMultipleChoice()
    });

    questionTextForm.addEventListener('submit', (e) => {
        e.preventDefault();
        specs = gatherQuestionSpecs()
        if (specs.type === 'multiple-choice'){
            displayMultipleChoiceOptions()
        }
    })

    promptInput.addEventListener("input", (event) => {
        if (promptInput.value.includes('?')) {
            specs = gatherQuestionSpecs() 
            if (specs.type === 'multiple-choice') {
                displayMultipleChoiceOptions()
            }
        }
    })

    document.querySelectorAll(".survey-preview-button-container").forEach(container=>{
        container.addEventListener('mouseover',(e)=>{
            e.target.childNodes

            setTimeout(function () {
                e.target.classList.add("is-light")
                e.target.classList.remove("is-dark");
            }, 7000);
        })
    })
    
    const displayMultipleChoiceOptions = ()=>{
       mChoiceOptionContainer.classList.remove('is-hidden')
       document.getElementById("multiple-choice-form").classList.remove("is-hidden")
    }


    createNewOptionInputs = () => {
        document.getElementById("option-four").classList.remove("is-hidden")
        document.getElementById("option-five").classList.remove("is-hidden")
        document.getElementById("option-three").classList.remove("add-more-options")
    }

    opThree.addEventListener("input", (event) => {
        if (opThree.classList.contains("add-more-options")) { 
            createNewOptionInputs() }
    })

    document.getElementById('add-option')
        .addEventListener('click',(e)=>{
            e.stopPropagation();
            //TODO validate some text has been entered as a multiple choice option
            const newOption = newOptionInput.value
            const newOptionListItem = document.createElement('li')
            newOptionListItem.innerHTML = newOption
            optionList.appendChild(newOptionListItem)
            newOptionInput.value = ''
        })

    document.getElementById('save-question').addEventListener('click',(e)=>{
        reApplyAutoSelectMultipleChoice()
        specs.opOne = document.getElementById("option-one").value
        specs.opTwo = document.getElementById("option-two").value    
        specs.opThree = document.getElementById("option-three").value
        specs.opFour = document.getElementById("option-four").value
        specs.opFive = document.getElementById("option-five").value
        optionsContainer.classList.add("is-hidden")
        newQuestionButton.classList.remove("is-hidden")
        clearInputValues()
        createQuestion();
    })

    reApplyAutoSelectMultipleChoice=()=>{
        const questionType = document.getElementById("question-type")
        questionType.selectedIndex = 0
    }

    clearInputValues=()=>{
        opThree.classList.add("add-more-options")
        const inputs = document.querySelectorAll(".new-option-text")
        inputs.forEach(input => {
            input.value = ""
        })
        document.getElementById("option-four").classList.add("is-hidden")
        document.getElementById("option-five").classList.add("is-hidden")
    }

})

