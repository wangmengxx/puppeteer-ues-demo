describe('add todo', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:7001/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('KoaTodo');
    })


    it('should new todo correct', async function() {
      await page.click('#new-todo', {delay: 500});
      await page.type('#new-todo', 'new todo item', {delay: 50});
      await page.keyboard.press("Enter");
      let todoList = await page.waitFor('#todo-list');
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList);
      expect(expectInputContent).to.eql('new todo item');
    }) 

  });


  describe('get todo length', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:7001/');
    });

    after (async function () {
      await page.close();
    });

    it('should have correct title', async function() {
      expect(await page.title()).to.eql('KoaTodo');
    })

    it('should get todo correctly',async function(){
      let list = await page.$$('#todo-list li');
      //console.log(list.length);
      expect(list).to.have.property('length');
     })

  });


  describe('complete todo', function () {
    let page;
    const delay = timeout => new Promise(resolve=> setTimeout(resolve, timeout));

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:7001/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('KoaTodo');
    })

    it('should completed todo item', async function(){
      await page.click('#todo-list', {delay:500});
      let todoItem = await page.waitForSelector('#todo-list li:first-child');
      let checkBtn = await todoItem.$('input.toggle');
      await checkBtn.click();
      await delay(2000);
      const realStatus = await page.evaluate(function(todoItem){
        return todoItem.className;
      },todoItem)
      expect(realStatus).to.eql('completed');
    })



  
  });