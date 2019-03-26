var db_data = require('../02-data-objects')

function randomTime () {
  return Math.random() * (8000 - 200) + 200;
}

function fetchFriends(userhandle, callback) {
  setTimeout(() => {
    let user = db_data.users.filter(u => u.handle === userhandle)
    if(user.length === 0) {
      callback({ err: true, msg: 'Unknown User' }, [])
    } else {
      let friendsList = db_data.friends.filter(list => list.user === userhandle)
      callback({ err: false, msg: null }, friendsList[0].friends)
    }
  }, randomTime());
}

function addFriend(userhandle, friendhandle) {
  //First create a new promise (check out mdn if lost)
  return new Promise((resolve, reject) => {
    let user = db_data.users.filter(u => u.handle === userhandle)
    let friend = db_data.users.filter(u => u.handle === friendhandle)
    
    if(!user.length || !friend.length) {
      reject('Incorrect userhandle provided')
    }

    let currentFriends = db_data.friends.filter(current => current.user === userhandle)[0]

    if(currentFriends.friends.includes(friendhandle)) {
      reject('Users are already friends')
    }
    
    let updatedFriends = []
    for(let i = 0; i < db_data.friends.length; i++) {
      const selectedFriend = db_data.friends[i]

      if(selectedFriend.user === userhandle){
        selectedFriend.friends.push(friendhandle)
        updatedFriends = selectedFriend.friends
        continue;
      } else if (selectedFriend.user === friendhandle) {
        selectedFriend.friends.push(userhandle)
      }
    }

    resolve(updatedFriends)
  })  
}

function fetchUser(userhandle) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let user = db_data.users.filter(u => u.handle === userhandle)
        
      if(user.length === 0) {
        reject('Unknown User')
      } else {
        if (user[0].name === 'Dylan' &&
          db_data.friends[4].friends.length === 2 &&
          db_data.friends[4].friends.indexOf('7e6a2835-0389-42ca-a4f6-321386fd6947') > -1)
          console.log("Yay!!!!!")
        else
          console.log('Something went wrong')

        resolve(user[0])
      }
    }, randomTime())
  });
}

function main() {
  const callback = (errObj, data) => {
    if(errObj.err) {
      //This is the unhappy path
      console.log(errObj.msg)
      fetchFriends('7e6a2835-0389-42ca-a4f6-321386fd6947', callback)
    } else {
      //this is the happy path
      console.log("Kim has these friends", data)
      //Now we are going to add a friend, if he isn't already one:
      if(!data.includes('88c76784-14f6-4ca1-8567-5e2cf23fa23c')) {
        //They are not friends, so let's add him
        addFriend('7e6a2835-0389-42ca-a4f6-321386fd6947', '88c76784-14f6-4ca1-8567-5e2cf23fa23c')
          .then((data) => {
            console.log(`Here are the results from addFriend: ${data}`)
            //we have supposed added them successfully...we will now call
            //the fetchUser method to get back all the user info and it will
            //display the successfully console.log if we did things correctly
            fetchUser('88c76784-14f6-4ca1-8567-5e2cf23fa23c')
          })
          .catch((errMsg) => {
            //For this challenge we didn't handle the error case, when we
            //can't successfully add them as friends, so for now lets console.log
            //out the error message and call it good.
            console.log(`AddFriend Error: ${errMsg}`)
          })
      }
    }
  }

  // Note I purposefully put a typo in the user handle... it is missing the last character (don't correct this)
  fetchFriends('e582a642-e400-453f-b0f1-4aaa0a419cb', callback)

}

main()
