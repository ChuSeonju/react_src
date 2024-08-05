const countdown = (value, fn, delay = 1000) => {
  // fn =   (value) => console.log(value);
  fn(value);
  return value > 0
    ? countdown(value-1, fn)
    : value;
};

const log = (value) => console.log(value);
countdown(10, log);
