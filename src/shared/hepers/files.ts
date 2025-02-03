import type { ActualFileObject } from "filepond"

const storeName = "localFiles"
const storeKey = "fileName"
let db: IDBDatabase | null = null

window.addEventListener("load", async () => {
  db = await initIndexedDb("my-db", [{ name: storeName, keyPath: storeKey }])
})

type StoreConfig = {
  name: string
  keyPath: string
}

const initIndexedDb = (
  dbName: string,
  stores: StoreConfig[],
): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request: IDBOpenDBRequest = indexedDB.open(dbName, 1)

    request.onerror = (event: Event) => {
      const target = event.target as IDBRequest
      reject(target.error)
    }

    request.onsuccess = (event: Event) => {
      const target = event.target as IDBRequest
      resolve(target.result as IDBDatabase)
    }

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBRequest).result as IDBDatabase
      stores.forEach(store => {
        if (!db.objectStoreNames.contains(store.name)) {
          const objectStore = db.createObjectStore(store.name, {
            keyPath: store.keyPath,
          })
          objectStore.createIndex(store.keyPath, store.keyPath, {
            unique: true,
          })
        }
      })
    }
  })
}

type IndexDbFile = {
  [storeKey]: string
  name: string
  type: string
  size: number
  data: string | ArrayBuffer | null
}

const readFile = (file: ActualFileObject): Promise<IndexDbFile> => {
  return new Promise<IndexDbFile>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = event => {
      if (!event.target) {
        reject()
        return
      }
      resolve({
        [storeKey]: Date.now().toString(),
        name: file.name,
        type: file.type,
        size: file.size,
        data: event.target.result,
      })
    }
    reader.onerror = event => {
      reject(event.target!.error)
    }
    reader.readAsArrayBuffer(file)
  })
}

export const saveFile = async (file: ActualFileObject) => {
  const data = await readFile(file)
  if (!db) {
    return
  }
  const store = db.transaction(storeName, "readwrite").objectStore(storeName)
  store.add(data)

  return new Promise<string>((resolve, reject) => {
    store.transaction.oncomplete = () => {
      resolve(data[storeKey])
    }
    store.transaction.onerror = () => {
      reject()
    }
  })
}

export const getFile = async (filename: string) => {
  if (!db) {
    return
  }
  let request = db
    .transaction(storeName, "readonly")
    .objectStore(storeName)
    .get(filename)

  return new Promise<File>((resolve, reject) => {
    if (!request) {
      reject()
    }
    request.onsuccess = (event: Event) => {
      const file = new File([request.result.data], request.result.fileName, {
        type: request.result.type,
      })
      resolve(file)
    }
    request.onerror = () => {
      reject()
    }
  })
}

export const downloadFile = (file: File) => {
  const url = URL.createObjectURL(file)
  const a = document.createElement("a")
  a.href = url
  a.download = file.name || "download"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
