document.addEventListener('DOMContentLoaded', e => {
    document.querySelectorAll('.question_container').forEach(question => {
        chartQuestion(question)
    });
});

const chartQuestion = question => {
    question.addEventListener('click', async function clickHandler(e) {
        const responseObjects = await getQuestionResponses(question.lastChild.value)
        const chart = document.createElement('canvas')
        chart.style.width = '300px'
        chart.style.height = '300px'
        question.appendChild(chart)
        question.childNodes.forEach((option, i) => {
            if (i > 1 && i < question.childNodes.length) option.setAttribute('hidden', 'true')
        });
        createChart(chart, tallyResponses(responseObjects))
        question.removeEventListener('click', clickHandler)
    });
}

const tallyResponses = (arr, results = []) => {
    if (arr.length < 1) return results
    results.push(buildObj(arr.filter(option => option.questionResponseValue === arr[0].questionResponseValue)))
    tallyResponses(arr.filter(option => option.questionResponseValue !== arr[0].questionResponseValue), results)
    return results
}

const buildObj = arr => {
    return {
        title: arr[0].questionResponseValue,
        count: arr.length
    }
}

const getQuestionResponses = async (questionId) => {
    const res = await fetch(`/surveys/${document.querySelector('.survey_id').value}/questions/${questionId}`);
    const data = await res.json();
    return data
}

const createChart = (container, data) => {
    return new Chart(container.getContext('2d'), {
        type: 'pie',
        data: {
            labels: [...data.map(el => el.title)],
            datasets: [{
                label: '# of Votes',
                data: [...data.map(el => el.count)],
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
            }],
        },
        options: {
            legend: {
                position: 'left'
            }
        }
    })
}
