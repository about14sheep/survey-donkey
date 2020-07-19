document.addEventListener('DOMContentLoaded', async ()=> {

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
    const opTwo = document.getElementById("option-two")
    const freeResponseOptions = document.getElementById('free-response-text-box')
    const radioButtonHolder = document.getElementById('radio-button-holder')
    const scrollResponseBox = document.getElementById('scroll-response-box')
    const publishSurvey = document.getElementById('publish-survey')
    //global variables
    let specs;
    //f()s

    const createQuestion = async () => {
        hideAllQuestionTypeOptions()
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
        const response = await fetch(`/surveys/create/${surveyId})`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Csrf-Token": token
            },
            body: data
        })
        console.log(response)
        console.log(response.body)
        const question = await response.json()
        promptInput.value = "";
        optionsContainer.classList.add("is-hidden")
        mChoiceOptionContainer.classList.add("is-hidden")
        setTimeout(()=>{newQuestionButton.classList.remove("is-hidden")},400)
        specs=""
        const container = createPreviewQuestionContainer(question)
        surveyPreview.appendChild(container)
    }

    // popUp.addEventListener('close', ()=>{

    // form(action = `surveys/${survey.id}` method = "DELETE")
    // button(class= 'button is-danger' type = 'submit' onclick = "return confirm('Are you sure you want to delete this survey?');") Delete

    const createDeleteButton = (questionId,color="") => {
        const confirmDeleteDiv = document.createElement('div')
        confirmDeleteDiv.classList.add("confirm-delete-div")
        const confirmDeleteButton = document.createElement('button')
        const cancelDeleteButton = document.createElement('button')
        confirmDeleteButton.classList.add("button", "is-dark", "is-danger", "confirm-delete-button","is-hidden")
        confirmDeleteButton.setAttribute('id',`confirm-delete-for-${questionId}`)
        confirmDeleteButton.style.marginRight = '10px'
        cancelDeleteButton.setAttribute('id', `cancel-delete-for-${questionId}`)
        addEventListenerToCancelDeleteButton(cancelDeleteButton)
        const deleteButton = document.createElement('button')
        deleteButton.classList.add("button", "is-dark", "is-danger", "delete-button")
        if (color === "yellow") {
            deleteButton.classList.remove("is-danger")
            deleteButton.classList.add("is-warning")
        }
        addEventListenerToDeleteButton(deleteButton)
        deleteButton.setAttribute("id",`${questionId}`)
        cancelDeleteButton.classList.add("button","is-dark","is-warning","cancel-delete-button","is-hidden")
        confirmDeleteButton.innerHTML = "confirm remove"
        addEventListenerToDeleteConfirmButton(confirmDeleteButton)
        deleteButton.innerHTML = "remove"
        cancelDeleteButton.innerHTML = "cancel"
        confirmDeleteDiv.appendChild(confirmDeleteButton)
        confirmDeleteDiv.appendChild(cancelDeleteButton)
        confirmDeleteDiv.appendChild(deleteButton)
        return confirmDeleteDiv
    }

    const addEventListenerToDeleteButton = button => {
            button.addEventListener('click',(e)=>{
                e.target.classList.add("is-hidden")
                let confirm = document.getElementById(`confirm-delete-for-${e.target.id}`)
                let cancel = document.getElementById(`cancel-delete-for-${e.target.id}`)
                confirm.classList.remove("is-hidden")
                cancel.classList.remove("is-hidden")
            })
    }

    const addEventListenerToDeleteConfirmButton = button => {
            button.addEventListener('click', (e) => {
                e.target.classList.add("is-hidden")
                let id = e.target.id
                id = id.split("-")[3]
                deleteQuestion(id)
            })
    }

    const addEventListenerToCancelDeleteButton = button => {
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

    const deleteQuestion= async (questionId)=>{
        let data = JSON.stringify({
            questionId: questionId
        })
        const token = document.getElementById('csrfToken').value
        const create = await fetch(`/surveys/questions/${questionId}`, {
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
        console.log("after gathering question specs: ",specs)
        if (specs.type === 'multiple-choice'){
            displayMultipleChoiceOptions()
        } else if (specs.type === 'free-response') {
            displayFreeResponseOptions()
        } else if (specs.type === 'scroll') {
            displayScrollOptions()
        }
    })

    typeInput.addEventListener('change', (e) => {
        specs = gatherQuestionSpecs();
        console.log(typeInput.value)
        if (typeInput.value === "free-response") {
            clearInputValues()
            displayFreeResponseOptions()
        } else if (typeInput.value === "multiple-choice") {
            displayMultipleChoiceOptions()
        } else if (typeInput.value === "scroll") {
            clearInputValues()
            displayScrollOptions()
        }
    })

    const gatherQuestionSpecs = () => {
        const type = typeInput.value
        const prompt = promptInput.value
        return { type: type, prompt: prompt }
    }

    const displayMultipleChoiceOptions = () => {
        hideAllQuestionTypeOptions()
        mChoiceOptionContainer.classList.remove('is-hidden')
        document.getElementById("multiple-choice-form").classList.remove("is-hidden")
    }

    const displayFreeResponseOptions=()=> {
        hideAllQuestionTypeOptions()
        mChoiceOptionContainer.classList.remove("is-hidden")
        freeResponseOptions.classList.remove("is-hidden")
    }

    const displayScrollOptions = () => {
        hideAllQuestionTypeOptions()
        mChoiceOptionContainer.classList.remove('is-hidden')
        scrollResponseBox.classList.remove("is-hidden")
    }

    const hideAllQuestionTypeOptions = () => {
        document.getElementById("multiple-choice-form").classList.add("is-hidden")
        freeResponseOptions.classList.add("is-hidden")
        scrollResponseBox.classList.add("is-hidden")
    }
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

    const clearInputValues = () => {
        opThree.classList.add("add-more-options")
        opTwo.classList.add("add-more-options")
        const inputs = document.querySelectorAll(".new-option-text")
        inputs.forEach(input => {
            input.value = ""
        })
        document.getElementById("option-four").classList.add("is-hidden")
        document.getElementById("option-five").classList.add("is-hidden")
    }

    displayOptionFour = () => {
        document.getElementById("option-four").classList.remove("is-hidden")
        document.getElementById("option-two").classList.remove("add-more-options")
    }

    opThree.addEventListener("input", (event) => {
        if (opThree.classList.contains("add-more-options")) { 
            displayOptionFive() }
    })

    displayOptionFive = () => {
        document.getElementById("option-five").classList.remove("is-hidden")
        document.getElementById("option-three").classList.remove("add-more-options")
    }

    opTwo.addEventListener("input", (event) => {
        if (opTwo.classList.contains("add-more-options")) {
            displayOptionFour()
        }
    })

    document.getElementById('save-question').addEventListener('click',(e)=>{
        console.log(specs)
        if(!specs.prompt) {
            specs.prompt = promptInput.value
            specs.type = typeInput.value
        }
        reApplyAutoSelectMultipleChoice()
        if (specs.type === "scroll") {
            specs.opOne = "Strongly Disagree"
            specs.opTwo = "Disagree"
            specs.opThree = "No Opinion"
            specs.opFour = "Agree"
            specs.opFive = "Strongly Agree"
        } else if (specs.type === "multiple-choice" || specs.type === "free-response") {
            specs.opOne = document.getElementById("option-one").value ? document.getElementById("option-one").value : null
            specs.opTwo = document.getElementById("option-two").value ? document.getElementById("option-two").value : null
            specs.opThree = document.getElementById("option-three").value ? document.getElementById("option-three").value : null
            specs.opFour = document.getElementById("option-four").value ? document.getElementById("option-four").value : null
            specs.opFive = document.getElementById("option-five").value ? document.getElementById("option-five").value : null
        }
        optionsContainer.classList.add("is-hidden")
        newQuestionButton.classList.remove("is-hidden")
        clearInputValues()
        createQuestion();
    })

    const reApplyAutoSelectMultipleChoice=()=>{
        const questionType = document.getElementById("question-type")
        questionType.selectedIndex = 0
    }

    const createPreviewQuestionContainer = question => {
        console.log(question)
        let newQuestionContainer = document.createElement("div");
        newQuestionContainer.classList.add("survey-preview-question-container")
        newQuestionContainer.setAttribute("id", `container-for-question-${question.id}`)
        let newQuestionText = document.createElement("div");
        let newQuestionTextContainer = document.createElement("div");
        newQuestionTextContainer.appendChild(newQuestionText)
        newQuestionTextContainer.classList.add("question-text-and-button-container")
        newQuestionText.classList.add('survey-preview-question-text');
        newQuestionText.innerHTML = question.questionText;
        let editButton = document.createElement("button")
        editButton.classList.add("button", "is-dark", "is-info", "edit-button")
        editButton.innerHTML = "edit"
        editButton.value = question.id;
        addEventListenerToEditButton(editButton);
        editButton.style.marginRight = '10px'
        let deleteButton = createDeleteButton(question.id,"yellow")
        let editButtonHolder = document.createElement("div")
        editButtonHolder.classList.add("edit-button-holder")
        editButtonHolder.appendChild(editButton)
        editButtonHolder.appendChild(deleteButton)
        newQuestionTextContainer.appendChild(editButtonHolder)
        newQuestionContainer.appendChild(newQuestionTextContainer)
        if (question.questionType === "free-response") {
            let newOptionText = document.createElement("div")
            newOptionText.innerHTML = "[Free Response Question]"
            newOptionText.classList.add('survey-preview-question-option');
            newQuestionContainer.appendChild(newOptionText)
        } else if (question.questionType === "multiple-choice") {
            let keys = ['opOne', 'opTwo', 'opThree', 'opFour', 'opFive']
            keys.forEach(key => {
                console.log(question[key])
                if (question[key]) {
                    let newOptionText = document.createElement("div")
                    newOptionText.innerHTML = question[key]
                    newOptionText.classList.add('survey-preview-question-option');
                    newQuestionContainer.appendChild(newOptionText)
                }
                })
            } else if (question.questionType === "scroll") {
                radioButtons = radioButtonHolder.cloneNode(true)
                radioButtons.setAttribute("id","")
                console.log("asdfasdfasdfasdfasdfasdfasdf: ",radioButtons)
                newQuestionContainer.appendChild(radioButtons)
            }  
        return newQuestionContainer
    }

    const createSurveyPreviewElements = (questions) => {
        surveyPreview.innerHTML = ""
        surveyPreview.appendChild(surveyPreviewTitle)
        questions.forEach(question => {
            let container = createPreviewQuestionContainer(question)
            surveyPreview.appendChild(container)
        })
    }

    const addEventListenerToEditButton = button => {
        button.addEventListener("click", async (e) => {
            specs = ""
            const questionInfo = await fetch(`/surveys/questions/${e.target.value}`)
            const formattedQuestionInfo = await questionInfo.json();
            container = document.getElementById(`container-for-question-${formattedQuestionInfo.id}`)
            editWindow = createEditWindow(formattedQuestionInfo)
            populateEditWindow(editWindow,formattedQuestionInfo)
            container.innerHTML = editWindow.innerHTML
            let buttons = createEditButtons(formattedQuestionInfo)
            buttons.style.marginTop = "10px"
            container.appendChild(buttons)
        })
    }

    const populateEditWindow = (editWindow, question) => {
        let type = question.questionType
        if (type === "scroll") {
            let editScrollBox = scrollResponseBox.cloneNode(true)
            editScrollBox.setAttribute("id","edit-scroll-response-box")
            editScrollBox.classList.remove("is-hidden")
            editWindow.appendChild(editScrollBox)
        } else if (type === "free-response") {
            let editFreeResponseBox = freeResponseOptions.cloneNode(true)
            editFreeResponseBox.setAttribute("id", "edit-free-response-text-box")
            editFreeResponseBox.classList.remove("is-hidden")
            editWindow.appendChild(editFreeResponseBox)
        } else if (type === "multiple-choice") {
            let multipleChoiceChildren = createMultipleChoiceValsForEdit(question)
            editWindow.appendChild(multipleChoiceChildren)
        }
    }

    const addEventListenerToAccept =(accept)=>{
        console.log("hey")
        accept.addEventListener('click',async (e)=>{
            console.log("asdfjklajsdfkjasdfkljasdlkfj:    ",e.target.id)
            console.log("ADSFASDFASDFASD QWOOOOOOOOOOO ME")
            let questionDetails = {id: e.target.id}
            console.log("questionId:  ",questionDetails.id)
            questionDetails.questionText = document.getElementById("edit-prompt-input").value
            questionDetails.opOne = document.getElementById("option-one-edit") ? document.getElementById("option-one-edit").value : null
            questionDetails.opTwo = document.getElementById("option-two-edit") ? document.getElementById("option-two-edit").value : null
            questionDetails.opThree = document.getElementById("option-three-edit") ? document.getElementById("option-three-edit").value : null
            questionDetails.opFour = document.getElementById("option-four-edit") ? document.getElementById("option-four-edit").value : null
            questionDetails.opFive = document.getElementById("option-five-edit") ? document.getElementById("option-five-edit").value : null
            const updatedQuestionInfo = await updateQuestion(questionDetails)
            updateSurveyPreview(updatedQuestionInfo)
        })
    }

    const updateQuestion = async (question) => {
        const token = document.getElementById('csrfToken').value
        const response = await fetch(`/surveys/questions/update/${question.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Csrf-Token": token
            },
            body: JSON.stringify({
                questionText: question.questionText,
                questionType: question.type,
                opOne: question.opOne,
                opTwo: question.opTwo,
                opThree: question.opThree,
                opFour: question.opFour,
                opFive: question.opFive
            })
        })
        const updatedQuestion = await response.json();
        return updatedQuestion
    }

    const allEditButtons = (toggle) => {
        const editButtons = document.querySelectorAll("edit-button")
        if (toggle === "disable") {
            editButtons.forEach(button=>{button.disabled = true})
        } else if (toggle === "enable")
            editButtons.forEach(button=>{button.disabled = false})
    }

    const updateSurveyPreview=(question)=>{
        console.log(question)
        const container = document.getElementById(`container-for-question-${question.id}`)
        container.parentNode.replaceChild(createPreviewQuestionContainer(question),container)
    }


    const createEditButtons=(question)=>{
        const buttonHolder = document.createElement('div')
        buttonHolder.style.display="flex"
        buttonHolder.style.flexDirection="row"
        buttonHolder.style.marginLeft = "10px"
        const acceptButton = document.createElement('button')
        acceptButton.classList.add("button","is-dark","is-primary")
        acceptButton.setAttribute("id",`${question.id}`)
        buttonHolder.appendChild(acceptButton)
        acceptButton.innerHTML = "accept";
        addEventListenerToAccept(acceptButton)
        const removeButton = createDeleteButton(question.id,"yellow")
        removeButton.style.marginLeft = "10px"
        buttonHolder.appendChild(removeButton)
        if (question.questionType === 'multiple-choice') {
            const addOptions = createAddOptionButton(question)
            buttonHolder.appendChild(addOptions)
        }
        return buttonHolder
    }

    const createAddOptionButton=(question)=>{
        const addOption = document.createElement("button")
        addOption.classList.add("button","is-dark")
        addOption.innerHTML = "+ option"
        addOption.style.marginLeft = "10px"
        addOption.setAttribute("id",`${question.id}`)
        addOption.addEventListener('click',(e)=>{
            const editOptionsContainer = document.getElementById("edit-options-container")
            const children = editOptionsContainer.childNodes
            if (children.length < 5) {
                const newInput = createNewEditInput(editOptionsContainer,question)
                editOptionsContainer.appendChild(newInput)
            }
        })
        return addOption
    }

    const createNewEditInput=(container,question)=>{
        if (container.childNodes.length === 0) {
            const opOneEdit = document.createElement('input')
            opOneEdit.setAttribute("id", "option-one-edit")
            opOneEdit.classList.add("new-option-text")
            opOneEdit.style.marginTop = "10px"
            return opOneEdit
        } else if (container.childNodes.length === 1) {
            const opTwoEdit = document.createElement('input')
            opTwoEdit.setAttribute("id", "option-two-edit")
            opTwoEdit.classList.add("new-option-text")
            return opTwoEdit
        } else if (container.childNodes.length === 2) {
            const opThreeEdit = document.createElement('input')
            opThreeEdit.setAttribute("id", "option-three-edit")
            opThreeEdit.classList.add("new-option-text")
            return opThreeEdit
        } else if (container.childNodes.length === 3) {
            const opFourEdit = document.createElement('input')
            opFourEdit.setAttribute("id", "option-four-edit")
            opFourEdit.classList.add("new-option-text")
            return opFourEdit
        } else if (container.childNodes.length === 4) {
            const opFiveEdit = document.createElement('input')
            opFiveEdit.setAttribute("id", "option-five-edit")
            opFiveEdit.classList.add("new-option-text")
            return opFiveEdit
        }
    }

    const createEditWindow = (question) => {
        let editWindow = document.createElement("div")
        let editPromptHolder = document.createElement("div")
        editPromptHolder.style.display = "flex"
        editPromptHolder.style.width = "860px"
        editPromptHolder.style.flexDirection = "row"
        editPromptHolder.setAttribute("id",`title-for-${question.id}`)
        let editPrompt = promptInput.cloneNode(true)
        editPrompt.setAttribute("id","edit-prompt-input")
        let editType = document.createElement("button")
        editType.style.marginLeft = "10px"
        editType.classList.add("button","disabled","is-light")
        editType.innerHTML = question.questionType
        editPrompt.setAttribute("value", `${question.questionText}`)
        editPromptHolder.appendChild(editPrompt)
        editPromptHolder.appendChild(editType)
        editWindow.appendChild(editPromptHolder)
        return editWindow
    }

    const createMultipleChoiceValsForEdit=(question)=>{
        let options = document.createElement("div");
        options.setAttribute("id","edit-options-container")
        options.style.display = "flex"
        options.style.flexDirection = "column"
        if (question.opOne){
            const opOneEdit = document.createElement('input')
            opOneEdit.setAttribute("id","option-one-edit")
            opOneEdit.classList.add("new-option-text")
            opOneEdit.style.marginTop = "10px"
            opOneEdit.setAttribute("value", `${question.opOne}`)
            options.appendChild(opOneEdit)
        }
        if (question.opTwo){
            const opTwoEdit = document.createElement('input')
            opTwoEdit.setAttribute("id", "option-two-edit")
            opTwoEdit.classList.add("new-option-text")
            opTwoEdit.setAttribute("value", `${question.opTwo}`)
            options.appendChild(opTwoEdit)
        }
        if (question.opThree) {
            const opThreeEdit = document.createElement('input')
            opThreeEdit.setAttribute("id", "option-three-edit")
            opThreeEdit.classList.add("new-option-text")
            opThreeEdit.setAttribute("value", `${question.opThree}`)
            options.appendChild(opThreeEdit)
        }
        if (question.opFour) {
            const opFourEdit = document.createElement('input')
            opFourEdit.setAttribute("id", "option-four-edit")
            opFourEdit.classList.add("new-option-text")
            opFourEdit.setAttribute("value", `${question.opFour}`)
            options.appendChild(opFourEdit)
        }
        if (question.opFive) {
            const opFiveEdit = document.createElement('input')
            opFiveEdit.setAttribute("id", "option-five-edit")
            opFiveEdit.classList.add("new-option-text")
            opFiveEdit.setAttribute("value", `${question.opFive}`)
            options.appendChild(opFiveEdit)
        }
        return options
    }

    const renderPreview = async (surveyId) => {
        const questions = await fetch(`/surveys/preview/${surveyId})`)
        const gatherQuestions = await questions.json()
        const surveyQuestions = gatherQuestions.map(el => JSON.parse(el))
        createSurveyPreviewElements(surveyQuestions)
    }

    const surveyId = document.getElementById('surveyId').value
    const surveyInfo = await fetch(`/surveys/questions/all/${surveyId}`)
    console.log("surveyinfo: ", surveyInfo)
    survey = await surveyInfo.json()
    survey.forEach(question => {
        let container = createPreviewQuestionContainer(question)
        surveyPreview.appendChild(container)
    })

    
})

