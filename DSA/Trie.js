class TrieNode {

    constructor() {
        this.children = new Map() // <char, TrieNode<>> (pointer to next tn from this char)
        this.endOfWord = false
    }
}

class Trie {

    constructor() {
        this.root = new TrieNode()
    }

    // insert word
    insert(w) {
        let addedNewWord = false;

        let curr = this.root // start at root
        const len = w.length

        // iterate over parameter's letters
        for (let i = 0; i < len; i++) {
            // console.log(i)
            let char = w[i] // curr char
            // console.log(char)

            // if current tn's dictionary doesn't contain this letter, add it
            if (!curr.children.has(char)) {
                curr.children.set(char, new TrieNode())
                addedNewWord = true // acknowledge added new word
            }

            curr = curr.children.get(char) // traverses to next tn from this char; next tn may or may not be empty

        }

        curr.endOfWord = true // at the end of word, set to true

        // print result of insert
        if (addedNewWord) {
            console.log("Added new word " + w)
        } else {
            console.log("Word " + w + " exists")
        }
    }

    // search prefix: returns true if exists
    searchPrefix(p) {
        console.log("searching for prefix " + p)
        if (!this.root) {
            return false
        }

        let char

        let curr = this.root, len = p.length
        for (let i = 0; i < len; i++) { // iterate up to string length - 1 and check if last char exists from char - 1 (e.g. ba, go up to b and check if a exists from b)
            char = p[i]

            if (!curr.children.has(char)) {
                return false
            }

            curr = curr.children.get(char) // move to next letter
        }

        return true
    }

    // search word: returns true if exists
    searchWord(w) {
        console.log("searching for word " + w)

        let curr = this.root

        for (let i = 0; i < w.length; i++) {
            let char = w[i]
            if (!curr.children.get(char)) {
                return false
            }
            curr = curr.children.get(char)
        }

        return curr.endOfWord

    }

    // delete a word: returns error if can't delete this word
    // the word to be deleted can be: 
    // 1) alone and unconnected to other words 
    // 2) have one of its letters branch into another word
    // 3) be a substring of another word

    // main function: passed in word
    // recursive impl: delete nodes depending on case
    delete(w) {
        console.log("deleting word " + w)

        // returns true if no letters exist at this node; returns false if not end of word or letters exist here
        function deleteHelper(charIdx, curr) {
            // console.log(charIdx)

            // BASE CASE: reached end of word. i.e. index after true end
            if (charIdx === w.length) {
                
                // if not end of word, not safe delete
                if (!curr.endOfWord) {
                    return false
                }

                // set end of word to false, since it is not going to be a word any longer
                curr.endOfWord = false

                // if no words branch off here, it's empty, so return true to indicate to prev node that it's safe to delete from here
                return curr.children.keys().length === 0
            }

            // RECURSIVE CASE: go to next char to find safe delete (returns true) or not (returns false)

            // first check if next letter exists before referencing it
            let next = curr.children.get(w[charIdx])
            if (!next) {
                return false
            }

            // check for branches and eow at next letter
            let safeDelete = deleteHelper(charIdx + 1, next)
            if (safeDelete) {
                curr.children.delete(w[charIdx]) // delete this letter

                // return if any other branches to other words exist at this letter
                return curr.children.keys().length === 0   
            }
        }

        deleteHelper(0, this.root)
    }
}

/* words: add, apple, bat, ball, bob, bobby
(root)-> a   ---->  b
      (d   p)     (a    o)
     (d)    (p) (t   l)  (b)
    (eow)  (l) (eow)  (l)  (b, eow)
            (e)      (eow)  (y)
            (eow)             (eow)
*/

// 0, (ab)
// 1, (dp)
// 2, (d)
// 3, ()
/* words: add, apple, bat, ball, bob, bobby
(root)-> a   ---->  b
      (d   p)     (a    o)
   (d, eow)(p) (t   l)  (b)
           (l) (eow)  (l)  (b, eow)
            (e)      (eow)  (y)
            (eow)             (eow)
*/

// a given char's next tn contains possible chars to branch out to

const trie = new Trie()

console.log("Inserting add, apple, bat, ball, bob, bobby")
trie.insert("add")
trie.insert("apple")
trie.insert("bat")
trie.insert("ball")
trie.insert("bob")
trie.insert("bobby")

console.log("Search word tests")
console.log(trie.searchWord("add"), true)
console.log(trie.searchWord("apple"), true)
console.log(trie.searchWord("bat"), true)
console.log(trie.searchWord("ball"), true)
console.log(trie.searchWord("bob"), true)
console.log(trie.searchWord("addle"), false) // not exists
console.log(trie.searchWord("ba"), false) // incomplete
console.log(trie.searchWord("batch"), false) // over
console.log(trie.searchWord("adpple"), false) // cross over
console.log(trie.searchWord("bot"), false) // cross over

console.log("search for prefix")
console.log(trie.searchPrefix("a"), true)
console.log(trie.searchPrefix("add"), true)
console.log(trie.searchPrefix("bal"), true)
console.log(trie.searchPrefix("app"), true)

console.log("delete words")
trie.delete("add")
console.log(trie.searchWord("add"), false)
trie.delete("ball")
console.log(trie.searchWord("ball"), false)
console.log(trie.searchWord("bat"), true)
console.log(trie.searchWord("bob"), true)
trie.delete("bob")
console.log(trie.searchWord("bob"), false)
console.log(trie.searchWord("bobby"), true)
trie.delete("bobby")
console.log(trie.searchWord("bobby"), false)
trie.delete("bat")
console.log(trie.searchWord("bat"), false)