document.addEventListener('DOMContentLoaded', ()=> {
    
    const mainForm = document.getElementById('survey-form')
    const optionsContainer = document.getElementById('options-container')
    const typeInput = document.getElementById("question-type")
    const promptInput = document.getElementById("question-text")
    const newQuestionButton = document.getElementById("new-question-button")
    const mChoiceOptionContainer = document.getElementById("multiple-choice-container")
    const newOptionInput = document.getElementById('new-option-text')
    const optionList = document.getElementById('option-list')
    
    const gatherQuestionSpecs = () => {
        const type = typeInput.value
        const prompt = promptInput.value
        return {type: type, prompt: prompt}
    }
    const surveyOptions= {questionsArray:[]}
    let specs;
    newQuestionButton.addEventListener("click", (event)=> {
        typeInput.value= '';
        promptInput.value= '';
        optionsContainer.classList.remove("hidden")
        newQuestionButton.classList.add("hidden")
    });

    document.getElementById("new-question-options").addEventListener('click', (e) => {
        e.preventDefault();
        specs = gatherQuestionSpecs()
        if (specs.type === 'multiple-choice'){
            displayMultipleChoiceOptions()
        }
        // optionsContainer.classList.add("hidden")
        // newQuestionButton.classList.remove("hidden")
        
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
        let optionKeys = ['opOne','opTwo','opThree','opFour','opFour','opFive']
        optionList.childNodes.forEach(listItem=>{
            let key = optionKeys.shift()
            specs[key] = listItem.innerHTML
        })
        surveyOptions.questionsArray.push(specs)
        const surveyId = document.getElementById('surveyId').value
        const token = document.getElementById('csrfToken').value
        console.log(specs)
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

        fetch(`/surveys/create/${surveyId})`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Csrf-Token" : token
                },
                body: data
            })
                .then(function (res) {
                    if (!res.status===200) {
                        throw Error(res.statusText); // handle any potential server errors
                    }
                    console.log(res)
                    optionList.innerHTML = "";
                    promptInput.value= "";
                    optionsContainer.classList.add("hidden")
                    newQuestionButton.classList.remove("hidden")
                    mChoiceOptionContainer.classList.add("hidden")

                })
                .catch(function (error) {
                    console.log(error)
                });
    })

})

