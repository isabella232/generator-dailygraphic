var Generator = require('yeoman-generator')
var execSync = require('child_process').execSync
var os = require('os');

var GRAPHICS_FOLDER = '0B6jLQISCZzBkWDJ1YzFtQzlTQ2s'

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.createDriveSheet = function() {
      const filePath = this.destinationRoot() + '/' + this.name + '.xlsx'
      const gdriveCmd = `gdrive import -p ${GRAPHICS_FOLDER} ${filePath}`
      const awk = "awk -F ' ' '{print $2}'"

      // using exec so we can pipe lol
      const buffer = execSync(gdriveCmd + ' | ' + awk);
      this.googleID = buffer.toString('utf8', 0, buffer.length - 1);
      const update = `gdrive update --name "${this.name}" ${this.googleID} ${filePath}`
      execSync(update)
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
        ],
        pageSize: 16
      },
      {
        type: 'confirm',
        name: 'github',
        message: 'Would you like to create a new Github repo?',
        default: true
      },
      {
        type: 'confirm',
        name: 'gdrive',
        message: 'Would you like to use Google Drive?',
        default: true
      },
      {
        type: 'input',
        name: 'path',
        message: 'Where should this graphic be installed? (relative to home directory)',
        default: 'src/graphics-server/graphics'
      }
    ]).then((answers) => {
      this.name = answers.name
      this.graphicType = answers.graphicType.toLowerCase().replace(' ', '_')
      this.github = answers.github
      this.gdrive = answers.gdrive,
      this.path = answers.path
    })
  }

  configuring() {
    this.destinationRoot([os.homedir(), this.path, this.name].join('/'))
    this.baseFolder = [this.sourceRoot(), '_base'].join('/')
    this.templateFolder = [this.sourceRoot(), this.graphicType].join('/')
  }

  writing() {
    this.fs.copy(this.baseFolder + '/**/*', this.destinationRoot(), {
      globOptions: {
        dot: true
      }
    })
    this.fs.copy(this.templateFolder + '/**/*', this.destinationRoot(), {
      globOptions: {
        dot: true
      }
    })
  }

  install() {
    this.installDependencies({
      npm: false,
      bower: false,
      yarn: true
    })
  }

  end() {
    this.log('Initializing a git repo and setting up a spreadsheet for you.')

    this.spawnCommandSync('mv', ['sheet.xlsx', this.name + '.xlsx'])

    if (this.gdrive) {
      this.log('Uploading spreadsheet to Google Drive')
      this.createDriveSheet()
    }

    this.fs.copyTpl(
      this.templatePath(`${this.graphicType}/.graphic_config.js`),
      this.destinationPath('graphic_config.js'),
      {
        slug: this.name,
        id: this.googleID ? this.googleID : ''
      }
    )

    this.spawnCommandSync('git', ['init'])
    this.spawnCommandSync('git', ['add', '.'])
    this.spawnCommandSync('git', ['commit', '-m', 'Initial commit from Yeoman.'])

    if (this.github) {
      this.log('Pushing git repo to github')
      this.spawnCommandSync('gh', ['re', '-N', this.name, '-O', 'nprapps'])
      this.spawnCommandSync('git', ['remote', 'add', 'origin', 'https://github.com/nprapps/' + this.name + '.git'])
      this.spawnCommandSync('git', ['push', 'origin', 'master'])
    }
  }
}