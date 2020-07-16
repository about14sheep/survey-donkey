document.addEventListener('DOMContentLoaded', e => {
    document.querySelectorAll('.question_container').forEach(question => {
        chartQuestions(question)
    });
});

const chartQuestions = question => {
    question.addEventListener('click', async function clickHandler(e) {
        const responseObjects = await getQuestionResponses(question.lastChild.value)
        const chart = document.createElement('canvas')
        chart.style.width = '400px'
        chart.style.height = '400px'
        question.appendChild(chart)
        question.childNodes.forEach((option, i) => {
            if (i > 0) option.setAttribute('hidden', 'true')
        });
        createChart(chart, __tallyResponses(responseObjects))
        question.style.cursor = 'default'
        question.removeEventListener('click', clickHandler)
    });
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
                position: 'right'
            }
        }
    })
}

const __tallyResponses = (arr, results = []) => {
    const arrToFilter = arr.filter(option => option.questionResponseValue !== arr[0].questionResponseValue);
    const tally = __buildTally(arr.filter(option => option.questionResponseValue === arr[0].questionResponseValue));
    if (arrToFilter.length < 1) return results.push(tally);
    __tallyResponses(arrToFilter, results);
    results.push(tally);
    return results;
}

const __buildTally = arr => {
    return {
        title: arr[0].questionResponseValue,
        count: arr.length
    }
}
