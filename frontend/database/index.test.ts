import {
    selectCategories,
    selectRoomDocument,
    insertRoomDocument, updateRoomDocumentWhenLeaved, updateRoomDocumentWhenJoined
} from "./index";
import DocumentData = firebase.firestore.DocumentData;
import {RoomDocument} from "./model";

/**
 * 動作確認用のテストメソッドです。これらはdbとの疎通テスト用に使われます。
 * https://console.firebase.google.com/u/0/project/we-wanna-eat-jiro/database/firestore/
 */
describe('selectCategories が動作すること。', () => {
    test('データ数テスト', async () => {
        const c = await selectCategories();
        const docs = await c.get();

        docs.forEach(doc => {
            console.log(doc.id,'=>',doc.data());
        })

        expect(docs.docs.length).toEqual(2);
    })

})

describe('RoomDocumentの取得メソッドselectRoomDocument が動作すること。', () => {
    test('データ数テスト', async () => {
        const rs = await (await selectRoomDocument(2)).get();
        rs.forEach(el => {
            console.log(el.id,'=>',el.data())
        })
        expect(rs.docs.length).toEqual(1);
    })
})

describe('RoomDocumentの作成メソッド insertRoomDocument  が動作すること。', () => {
    test('投稿テスト', async () => {
        const roomDocument:RoomDocument = {
            name : "test_RoomDocument",
            admin: "test_admin",
            admin_uid: "test_uid",
            description: "test_description",
            users: []
        }
        await insertRoomDocument(1,roomDocument);
    })
})

describe('人間の侵入メソッド updateRoomDocumentWhenJoinedが動作すること。', () => {
    test('退出テスト', async () => {
        await updateRoomDocumentWhenJoined(1,"aWF0r7FaOvMEh4RN3SVL",{
            uid: "test uid",
            nickname: "test nickname",
            introduction: "Howdy!",
            evaluation: 3
        })
    })
})

describe('人間の退出メソッド updateRoomDocumentWhenLeavedが動作すること。', () => {
    test('退出テスト', async () => {
        await updateRoomDocumentWhenLeaved(1,"aWF0r7FaOvMEh4RN3SVL",{
            uid: "test uid",
            nickname: "test nickname",
            introduction: "Howdy!",
            evaluation: 3
        })
    })
})