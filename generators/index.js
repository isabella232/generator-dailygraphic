var Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.createDriveSheet = function() {
      const filename = this.name + '.xlsx'
      this.spawnCommand('gdrive', ['import', filename, '>', 'echo', ''])
    }
  }

  initializing() {
    this.log('Hey! Let\'s make a graphic! First, answer the following questions so we can have a nice starting point.')
  }

  prompting() {
    return this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
      }, 
      {
        type: 'list',
        name: 'graphicType',
        message: 'Your graphic type',
        choices: [
          'AI2HTML Graphic',
          'Animated Photo',
          'Bar Chart',
          'Block Histogram',
          'Column Chart',
          'Dot Chart',
          'Graphic',
          'Grouped Bar Chart',
          'Issue Matrix',
          'Line Chart',
          'Locator Map',
          'Slopegraph',
          'Stacked Bar Chart',
          'Stacked Column Chart',
          'Stacked Grouped Column Chart',
          'State Grid Map'
        ]
      },
      {
        type: 'confirm',
        name: 'gdrive',
        message: 'Would you like to use Google Drive?',
        default: true
      }
    ]).then((answers) => {
      this.name = answers.name
      this.graphicType = answers.graphicType.toLowerCase().replace(' ', '_')
      this.gdrive = answers.gdrive;
    })
  }

  configuring() {
    this.destinationRoot([this.destinationRoot(), this.name].join('/'))
    this.baseFolder = [this.sourceRoot(), '_base'].join('/')
    this.templateFolder = [this.sourceRoot(), this.graphicType].join('/')
  }

  writing() {
    this.fs.copy(this.baseFolder + '/**/*', this.destinationRoot())
    this.fs.copy(this.templateFolder + '/**/*', this.destinationRoot())
  }

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    })
  }

  end() {
    this.log('Initializing a git repo and creating a Google Spreadsheet for you')

    this.spawnCommand('git', ['init'])

    this.spawnCommand('mv', ['sheet.xlsx', this.name + '.xlsx'])
    if (this.gdrive) {
      this.createDriveSheet();
    }
  }
}