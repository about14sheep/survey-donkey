document.addEventListener('DOMContentLoaded', e => {
    document.querySelectorAll('.options').forEach(options => {
        chartQuestions(options)
    });
});

const mouseLeaveHandler = e => e.target.style.filter = ``;
const mouseOverHandler = e => e.target.style.filter = `drop-shadow(0 0 0.75rem #00BF6F)`;

const chartQuestions = options => {
    options.childNodes.forEach(option => {
        option.style.cursor = 'pointer'
        option.addEventListener('mouseover', mouseOverHandler)
        option.addEventListener('mouseleave', mouseLeaveHandler)
        option.addEventListener('click', async function clickHandler(e) {
            option.style.backgroundColor = '#00BF6F'
            postQuestionResponse(option.parentNode.lastChild.value, e.target.lastChild.value)
            option.parentNode.childNodes.forEach(option => {
                option.removeEventListener('mouseleave', mouseLeaveHandler)
                option.removeEventListener('mouseover', mouseOverHandler)
                option.removeEventListener('click', clickHandler)
            })
            setTimeout(async _ => {
                const responseObjects = await getQuestionResponses(option.parentNode.lastChild.value)
                options.childNodes.forEach((option, i) => option.style.display = 'none');
                const chart = document.createElement('canvas')
                options.parentNode.appendChild(chart)
                createChart(chart, __tallyResponses(responseObjects))
                option.style.cursor = 'default'
            }, 1000)
        });
    })

}

const getQuestionResponses = async (questionId) => {
    const res = await fetch(`/surveys/${document.querySelector('.survey_id').value}/questions/${questionId}`);
    const data = await res.json();
    return data
}

const postQuestionResponse = async (questionId, questionText) => {
    const token = document.getElementById('_csrfToken').value
    const data = JSON.stringify({
        responseText: questionText
    });
    const res = await fetch(`/surveys/${document.querySelector('.survey_id').value}/questions/${questionId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
            "Csrf-Token": token
        },
        body: data
    })
}

const createChart = (container, data) => {
    const chartTypes = ['pie', 'doughnut'];
    return new Chart(container.getContext('2d'), {
        type: chartTypes[randomNumber(chartTypes.length)],
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

const randomNumber = max => Math.floor(Math.random() * Math.floor(max));

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
