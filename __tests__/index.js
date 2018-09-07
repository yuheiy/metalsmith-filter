const filter = require('..')
const path = require('path')
const Metalsmith = require('metalsmith')
const co = require('co')
const fg = require('fast-glob')
const del = require('del')
const minimatch = require('minimatch')

const build = (predicate) => {
  return co(function*() {
    const m = Metalsmith('fixtures').use(filter(predicate))
    yield m.build()
  })
}

const readInput = async () => {
  return (await fg('fixtures/src/*', {
    transform: (entry) => path.relative('fixtures/src', entry),
  })).sort()
}

const readOutput = async () => {
  return (await fg('fixtures/build/*', {
    transform: (entry) => path.relative('fixtures/build', entry),
  })).sort()
}

afterEach(() => {
  return del('fixtures/build')
})

test('should pass all the files', async () => {
  await build(() => true)
  const input = await readInput()
  const output = await readOutput()
  expect(input).toEqual(output)
})

test('should exclude all the files', async () => {
  await build(() => false)
  const output = await readOutput()
  expect(output).toEqual([])
})

test('should exclude files starting with `_`', async () => {
  const shouldInclude = (filename) => !minimatch(filename, '_*')
  await build(shouldInclude)
  const output = await readOutput()
  expect(output.every(shouldInclude)).toBeTruthy()
})

test('should exclude empty files', async () => {
  await build((_filename, data) => String(data.contents))
  const output = await readOutput()
  expect(output).toEqual(['index.html'])
})
