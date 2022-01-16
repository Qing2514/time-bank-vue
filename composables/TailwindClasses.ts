class TailwindClasses {
  classNames: String[] = []

  constructor(classNames: string) {
    classNames.split(' ').forEach(className => {
      this.classNames.push(className)
    })
  }

  add = (addition: string) => {
    addition.split(' ').forEach(className => {
      if (!this.classNames.includes(className)) {
        this.classNames.push(className)
      }
    })
    return this
  }

  remove = (addition: string) => {
    addition.split(' ').forEach(className => {
      if (this.classNames.includes(className)) {
        this.classNames.splice(this.classNames.indexOf(className), 1)
      }
    })
    return this
  }

  toString = () => {
    return this.classNames.join(' ')
  }
}

export const tailwindClasses = (classes: string) => {
  return new TailwindClasses(classes)
}
