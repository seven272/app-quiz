// import  questions  from "./questions.js"
const App = {
 data () {
  return {
   title: 'Тест на базовое знание экономики',
   pageInd: 0,
   number: 0,
   questions: questions,
   score: 0,
   totalScore: 0,
   isDisabled: false,
   ans: '',
   answers: {
    correct: [],
    incorrect: []
   }
  }
 },
 computed: {
  showSection () {
   const arrNamesPages = ['start', 'quiz', 'result']
   return arrNamesPages[this.pageInd]
  },
  styleBackground () {
    let fon = {}
    let name = 'fon-1'
    if (this.number%2===0) {
      name = 'fon-2'
    } else if (this.number%3===0) {
      name = 'fon-3'
    }
    
    if (this.pageInd === 1) {
      fon = {
        // backgroundImage: 'url("./assets/photos/fon-1.jpg")'
        background: `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("./assets/photos/${name}.jpg")`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }
    } else if (this.pageInd === 2) {
      fon = {
        background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("./assets/photos/fon-4.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }
    }
    return fon
  },
  styleWhiteHeader () {
    let newStyle = {}
    if (this.pageInd !== 0 ) {
      newStyle = {
        color: '#ffffff',
        background: 'none'
      }
      return newStyle
    }
  },
  classWhiteHeader () {
    let name = ''
    if (this.pageInd !== 0 ) {
      name='item__header_white'
    }
    return name
  },
  styleWhiteFooter () {
    let newStyle = {}
    if (this.pageInd !== 0 ) {
      newStyle = {
        color: '#ffffff',
        background: 'none'
      }
      return newStyle
    }
  },
  showStartPageImage () {
   return './assets/photos/preview.png'
  },
  showCorrectAnswers () {
   let correctAnswers = this.answers.correct.join(', ')
   return correctAnswers
  },
  showIncorrectAnswers () {
   let incorrectAnswers = this.answers.incorrect.join(', ')
   return incorrectAnswers
  },
  showResultMessage () {
   // const score = this.$route.query.score
   let message = ''
   if (this.totalScore >= 0 && this.totalScore <= 10) {
     message = `Вы набрали ${this.totalScore}. Ваши знания в экономике на уровне эмбриона`
   } else if (this.totalScore > 10 && this.totalScore <= 50) {
     message = `Вы набрали ${this.totalScore}. Вы имеете представление об экономике, но Вам предстоит еще многое узнать, чтобы чувствовать себя уверено в этой науке`
   } else if (this.totalScore > 50 && this.totalScore < 90) {
     message = `Вы набрали ${this.totalScore}. Поздравляем отличный результат. Вы имеете широкие познания в экономике. "РБК-рынки" Ваша ежедневная утрення газета.`
   } else {
     message = `Вы набрали ${this.totalScore}. Фантастический результат. Вы либо закончили экономический ВУЗ с золотой медалью, либо сами преподаете в таком`
   }
   return message
 },
 showResultImage () {
  let image = ''
   if (this.totalScore >= 0 && this.totalScore <= 10) {
     image = 'result-1'
   } else if (this.totalScore > 10 && this.totalScore <= 50) {
     image = 'result-2'
   } else if (this.totalScore > 50 && this.totalScore < 90) {
     image = 'result-3'
   } else {
     image = 'result-4'
   }
   let fon = {
    background: `linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("./assets/photos/${image}.jpg")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover'
  }
   return fon
  },
  getYear () {
   const dateObj = new Date()
   const year = dateObj.getUTCFullYear()
   return year
  }
 },
 methods: {
  selectSection (number) {
   this.pageInd = number
  },
  nextQuestion () {
   this.number++
   this.totalScore += this.score
   this.ans = ''
   if (this.score === 10) {
    this.answers.correct.push(this.number)
   } else if (this.score === 0) {
    this.answers.incorrect.push(this.number)
   }
   if (this.number > this.questions.length - 1) {
    this.isDisabled = true
    this.selectSection(2)
   }
   this.isDisabled = false
  },
  scoringPoints (payload) {
   this.score = payload
  },
  refreshData () {
   this.score = 0
   this.totalScore = 0
   this.number = 0
   this.answers.correct = []
   this.answers.incorrect = []
   this.selectSection(1)
  }
 }

}
const app = Vue.createApp(App)
app.mount('#app')