document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('shopping-form');
    const itemList = document.getElementById('shopping-list');

    form.addEventListener('submit', addItem);
    itemList.addEventListener('click', toggleItem);
    itemList.addEventListener('click', deleteItem); 

    function addItem(e) {
        e.preventDefault();
        const itemInput = document.getElementById('item');
        const itemName = itemInput.value.trim();
        if (itemName && !containsHTML(itemName)) {
            const li = document.createElement('li');
            li.className = 'shopping-item';
            li.textContent = itemName;
            itemList.appendChild(li);
            const deleteBtn = document.createElement('span');
            deleteBtn.className = 'delete';
            deleteBtn.textContent = '❌';
            li.appendChild(deleteBtn);
            saveItems();
            itemInput.value = '';
        }
    }

    function toggleItem(e) {
        if (e.target.classList.contains('shopping-item')) {
            e.target.classList.toggle('completed');
            const deleteBtn = e.target.querySelector('.delete');
            if (e.target.classList.contains('completed')) {
                if (!deleteBtn) {
                    const deleteBtn = document.createElement('span');
                    deleteBtn.className = 'delete';
                    deleteBtn.textContent = '❌';
                    e.target.appendChild(deleteBtn);
                }
            } else {
                if (deleteBtn) {
                    deleteBtn.remove();
                }
            }
            saveItems();
        }
    }

    function deleteItem(e) {
        if (e.target.classList.contains('delete')) {
            e.target.parentElement.remove();
            saveItems();
        }
    }

    function saveItems() {
        const items = [];
        document.querySelectorAll('.shopping-item').forEach(item => {
            items.push({
                name: item.textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('shoppingItems', JSON.stringify(items));
    }

    function loadItems() {
        const items = JSON.parse(localStorage.getItem('shoppingItems'));
        if (items) {
            items.forEach(item => {
                const li = document.createElement('li');
                li.className = 'shopping-item';
                li.textContent = item.name;
                if (item.completed) {
                    li.classList.add('completed');
                    const deleteBtn = document.createElement('span');
                    deleteBtn.className = 'delete';
                    deleteBtn.textContent = '❌';
                    li.appendChild(deleteBtn);
                }
                itemList.appendChild(li);
            });
        }
    }

    function containsHTML(str) {
        const pattern = /<[^>]*>/;
        return pattern.test(str);
    }

    loadItems();
});