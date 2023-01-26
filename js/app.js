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
    if (this.pageInd !== 0 ) {
      fon = {
        backgroundImage: 'url("./assets/photos/fon-1.jpg")'
      }
    }
    return fon
  },
  styleWhiteHeader () {
    let newStyle = {}
    if (this.pageInd !== 0 ) {
      newStyle = {
        color: '#ffffff'
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
   let image = 'photo_1'
   if (this.totalScore >= 0 && this.totalScore <= 10) {
     image = 'photo_1'
   } else if (this.totalScore > 10 && this.totalScore <= 50) {
     image = 'photo_2'
   } else if (this.totalScore > 50 && this.totalScore < 90) {
     image = 'photo_3'
   } else {
     image = 'photo_4'
   }
   return `./assets/photos/${image}.jpg`
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
   if (this.score === 10) {
    this.answers.correct.push(this.number)
   } else if (this.score === 0) {
    this.answers.incorrect.push(this.number)
   }
   if (this.number > this.questions.length - 1) {
    this.isDisabled = true
    this.selectSection(2)
   }
  },
  scoringPoints (payload) {
   this.score = payload
  },
  refreshData () {
   this.score = 0
   this.totalScore = 0
   this.selectSection(0)
  }
 }

}
const app = Vue.createApp(App)
app.mount('#app')