require 'rails_helper'

RANDOM_100_CHARS = "hello world hello world hello world hello world hello world hello world hello world hello world hello world
hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world
hello world hello world hello world hello world hello world 
hello world hello world hello world hello world hello world hello world hello world hello world hello world
hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world hello world
hello world hello world hello world hello world hello world"

RSpec.describe JobPost, type: :model do
  # pending "add some examples to (or delete) #{__FILE__}"
  # above is just the boilerplate as an example

  describe "validates" do
    describe "title" do
      it "requires a title to be present" do
        #GIVEN
        job_post = JobPost.new()

        #WHEN
        job_post.valid?

        #THEN
        expect(job_post.errors.messages).to(have_key(:title))
      end

      it "requires a unique title" do
        #GIVEN 
        persisted_job_post = JobPost.create(
          title: "Full Stack Developer",
          describe: RANDOM_100_CHARS,
          min_salary: 35_000,
          location: 'Vancouver'
        )

        job_post = JobPost.new(
          title: persisted_job_post.title,
          describe: RANDOM_100_CHARS,
          min_salary: 35_000,
          location: 'Vancouver'
        )

        #WHEN
        job_post.valid?

        #THEN
        expect(job_post.errors.messages).to(have_key(:title))
      end

    end
    
    describe "describe" do 
      it "requires a describe to be present" do
        #GIVEN
        job_post = JobPost.new(title: "Title is present")

        #WHEN
        job_post.valid?

        #THEN
        expect(job_post.errors.messages).to(have_key(:describe))
      end

      it "requires a describe to be at lease 100 words" do
        #GIVEN
        job_post = JobPost.new(title: "Describe Test", describe: "abc")

        #WHEN
        job_post.valid?

        #THEN
        expect(job_post.errors.messages).to(have_key(:describe))

      end
    
    end

    describe "min_salary" do
      it "requires min_salary to be numerical" do
        #GIVEN
        job_post = JobPost.new(title: "For Minimum Salary", describe:RANDOM_100_CHARS, min_salary: "My min salary")
      
        #WHEN
        job_post.valid?

        #THEN
        expect(job_post.errors.messages).to(have_key(:min_salary))
      end
      
      it "requires min_salary to be at least 30_000" do
        #GIVEN
        job_post = JobPost.new(title: "For Minimum Salary 25000", describe:RANDOM_100_CHARS, min_salary: 25_000)
      
        #WHEN
        job_post.valid?

        #THEN
        expect(job_post.errors.messages).to(have_key(:min_salary))
      end 

    end

    describe "location" do
      it "requires a location to be present" do
        #GIVEN
        job_post = JobPost.new(title: "My Home Jobe", describe:RANDOM_100_CHARS, min_salary: 35_000)
      
        #WHEN
        job_post.valid?

        #THEN
        expect(job_post.errors.messages).to(have_key(:location))
      end 
    end
  end

end

