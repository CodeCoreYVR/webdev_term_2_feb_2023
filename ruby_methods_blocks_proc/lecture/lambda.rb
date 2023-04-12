

my_lambda = lambda { puts "I'm a lamba"; return }

stabby_lambda = -> { puts "I'm a stabby_lambda"; return }

my_proc = proc { puts "I'm a proc"; return }

my_lambda.call
stabby_lambda.call
my_proc.call



lambda_add = lambda { |a,b| a+b }

stabby_add = -> (a,b) { a+b }

proc_add = proc { |a,b| a+b }

 lambda_add.call(2,3)
p stabby_add.call(2,3)
p proc_add.call(2,3)



lambda_add = lambda { |a,b| a+b }

stabby_add = -> (a,b) { a+b }

proc_add = proc { |a,b| a+b }

my_lambda = lambda { puts "I'm a lamba"; return }

stabby_lambda = -> { puts "I'm a stabby_lambda"; return }

my_proc = proc { puts "I'm a proc"; return }

def lam_method(code)
    puts "---------#{code.class}"
    p code.call(2,8)
    puts "Hello from method"
end

def lam_method2(code)
    puts "---------#{code.class}"
    p code.call
    puts "Hello from method"
end

lam_method(lambda_add)
lam_method(stabby_add)
lam_method(proc_add)

lam_method2(my_lambda)
lam_method2(my_proc)

power_2 = lambda { |x| x**2 }

p map([1,2,3,4,5,6], &power_2)