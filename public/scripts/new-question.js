document.addEventListener('DOMContentLoaded', ()=> {
    
    const mainForm = document.getElementById('survey-form')
    const optionsContainer = document.getElementById('options-container')
    const typeInput = document.getElementById("question-type")
    const promptInput = document.getElementById("question-text")
    const newQuestionButton = document.getElementById("new-question-button")
    const mChoiceOptionContainer = document.getElementById("multiple-choice-container")
    const newOptionInput = document.getElementById('new-option-text')
    const optionList = document.getElementById('option-list')
    const surveyPreview = document.getElementById('survey-form')
    const continueButton = document.getElementById("new-question-options")
    const currentQuestionPrompt = document.getElementById('current-question-prompt')
    const currentQuestionPromptContainer = document.getElementById('current-question-prompt-container')

    //global variables
    let specs;
    //f()s
    const gatherQuestionSpecs = () => {
        const type = typeInput.value
        const prompt = promptInput.value
        return {type: type, prompt: prompt}
    }

    const createCurrentQuestionTextDisplay=()=>{
        currentQuestionPromptContainer.classList.remove("is-hidden")
        currentQuestionPrompt.innerHTML = specs.prompt
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

        optionList.innerHTML = "";
        promptInput.value = "";
        optionsContainer.classList.add("hidden")
        mChoiceOptionContainer.classList.add("hidden")
        newQuestionButton.classList.remove("is-hidden")
        specs=""
        renderPreview(surveyId)
    }

    const renderPreview = async (surveyId) => {
        const questions = await fetch(`/surveys/preview/${surveyId})`)
        const gatherQuestions = await questions.json()
        const surveyQuestions = gatherQuestions.map(el => JSON.parse(el))
        createSurveyPreviewElements(surveyQuestions)
        console.log(surveyQuestions)
    }

    const createSurveyPreviewElements = (questions) => {
        questions.forEach(question => {
            let newQuestionContainer = document.createElement("div")
            newQuestionContainer.innerHTML = question.questionText
            surveyPreview.appendChild(newQuestionContainer)
        })
    }

    newQuestionButton.addEventListener("click", (event)=> {
        typeInput.value= '';
        promptInput.value= '';
        optionsContainer.classList.remove("hidden")
        newQuestionButton.classList.add("is-hidden")
    });

    continueButton.addEventListener('click', (e) => {
        e.preventDefault();
        optionsContainer.classList.add("hidden")
        specs = gatherQuestionSpecs()
        if (specs.type === 'multiple-choice'){
            displayMultipleChoiceOptions()
        }
        createCurrentQuestionTextDisplay()
    })
    
    const displayMultipleChoiceOptions = ()=>{
       mChoiceOptionContainer.classList.remove('hidden')
    }

    document.getElementById("add-option")
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
        currentQuestionPromptContainer.classList.add("is-hidden")
        let optionKeys = ['opOne','opTwo','opThree','opFour','opFour','opFive']
        optionList.childNodes.forEach(listItem=>{
            let key = optionKeys.shift()
            specs[key] = listItem.innerHTML
        })
        console.log(specs)
        createQuestion();
    })

})

