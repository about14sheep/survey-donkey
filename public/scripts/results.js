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
            parent.childNodes[1].childNodes.forEach((el3, i) => {
                const option = el3.textContent.toLowerCase()
                if (option === el2.questionResponseValue && i === 1) opOne++
                if (option === el2.questionResponseValue && i === 2) opTwo++
                if (option === el2.questionResponseValue && i === 3) opThree++
                if (option === el2.questionResponseValue && i === 4) opFour++
                if (option === el2.questionResponseValue && i === 5) opFive++
            })
        }
    })
    return [opOne, opTwo, opThree, opFour, opFive]
}