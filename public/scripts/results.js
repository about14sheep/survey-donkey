document.addEventListener('DOMContentLoaded', async e => {
    const responseObjects = await getResponses(document.querySelector('.survey_id').value);
    if (responseObjects) {
        document.querySelectorAll('.question_container').forEach(question => {
            const obj = tallyResponses(question, responseObjects)
            question.addEventListener('click', e => {
                question.childNodes.forEach((el, i) => {
                    if (i > 1) { el.toggleAttribute('hidden') }
                })
                createChart(question.firstChild, obj)
            });
        });
    }
});

const randomNumber = max => Math.floor(Math.random() * Math.floor(max));

const getResponses = async (id) => {
    const res = await fetch(`/surveys/${id}/responses`);
    const data = await res.json();
    return data
}

const createChart = (container, data) => {
    const charts = ['doughnut', 'pie', 'bar']
    return new Chart(container.getContext('2d'), {
        type: 'pie',
        data: {
            labels: [data.opOneText, data.opTwoText, data.opThreeText, data.opFourText, data.opFiveText],
            datasets: [{
                label: '# of Votes',
                data: [data.opOneScore, data.opTwoScore, data.opThreeScore, data.opFourScore, data.opFiveScore],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    })
}

const tallyResponses = (parent, responseObjects) => {
    const optionTexts = Array.from({ length: 5 }).map(el => el = '');
    let opOne, opTwo, opThree, opFour, opFive;
    opOne = opTwo = opThree = opFour = opFive = 0;
    responseObjects.forEach(el2 => {
        if (parent.lastChild.value.toLowerCase() === el2.Question.questionText.toLowerCase()) {
            const list = document.querySelector('.question_list')
            parent.childNodes[Array.from(list.parentNode.children).indexOf(list)].childNodes.forEach((el3, i) => {
                const option = el3.textContent.toLowerCase()
                const value = el2.questionResponseValue.toLowerCase()
                optionTexts[i] = el3.textContent
                if (option === value && i === 1) opOne++
                if (option === value && i === 2) opTwo++
                if (option === value && i === 3) opThree++
                if (option === value && i === 4) opFour++
                if (option === value && i === 5) opFive++
            })
        }
    })
    return {
        opOneText: optionTexts[1],
        opTwoText: optionTexts[2],
        opThreeText: optionTexts[3],
        opFourText: optionTexts[4],
        opFiveText: optionTexts[5],
        opOneScore: opOne,
        opTwoScore: opTwo,
        opThreeScore: opThree,
        opFourScore: opFour,
        opFiveScore: opFive
    }
}