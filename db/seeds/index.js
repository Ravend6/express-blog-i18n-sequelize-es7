import faker from 'Faker'
import { mysql } from '../connections'

(async () => {
  try {
    let db = await Promise.resolve(mysql())
    let Post = db.models.post
    for (let i = 0; i < 10; i++) {
      await Post.create({
        title: faker.Lorem.sentence().slice(0, 10),
        body: faker.Lorem.paragraph()
      })
    }
  } catch (err) {
    console.log(err)
  }
})()
