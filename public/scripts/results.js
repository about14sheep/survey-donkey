document.addEventListener('DOMContentLoaded', async e => {
    const responseObjects = await getResponses(document.querySelector('.survey_id').value);

    if (responseObjects) {
        document.querySelectorAll('.question_container').forEach(question => {
            question.addEventListener('click', e => {
                let [opOneCount, opTwoCount, opThreeCount, opFourCount, opFiveCount] = tallyResponses(question, responseObjects);
                console.log(opOneCount, opTwoCount, opThreeCount, opFourCount, opFiveCount)
            });
        });
    }
});

const getResponses = async (id) => {
    const res = await fetch(`/surveys/${id}/responses`);
    const data = await res.json();
    return data
}


const tallyResponses = (parent, responseObjects) => {
    let opOne, opTwo, opThree, opFour, opFive;
    opOne = opTwo = opThree = opFour = opFive = 0;
    responseObjects.forEach(el2 => {
        if (parent.lastChild.value.toLowerCase() === el2.Question.questionText.toLowerCase()) {
            const list = document.querySelector('.question_list')
            parent.childNodes[Array.from(list.parentNode.children).indexOf(list)].childNodes.forEach((el3, i) => {
                const option = el3.textContent.toLowerCase()
                const value = el2.questionResponseValue.toLowerCase()
                if (option === value && i === 1) opOne++
                if (option === value && i === 2) opTwo++
                if (option === value && i === 3) opThree++
                if (option === value && i === 4) opFour++
                if (option === value && i === 5) opFive++
            })
        }
    })
    return [opOne, opTwo, opThree, opFour, opFive]
}