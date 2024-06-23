package com.example.RentalApp.repository;

import com.example.RentalApp.model.Inventory;
import com.example.RentalApp.model.ItemStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Interfejs repozytorium do zarządzania encjami Inventory.
 */
@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {

    /**
     * Znajduje wszystkie rekordy Inventory.
     *
     * @return lista wszystkich obiektów Inventory.
     */
    List<Inventory> findAll();

    /**
     * Znajduje wszystkie rekordy Inventory z określoną nazwą przedmiotu.
     *
     * @param name nazwa przedmiotu.
     * @return lista obiektów Inventory o podanej nazwie przedmiotu.
     */
    List<Inventory> findAllByItemName(String name);

    /**
     * Znajduje wszystkie rekordy Inventory dla danego właściciela.
     *
     * @param id identyfikator właściciela.
     * @return lista obiektów Inventory należących do właściciela o podanym ID.
     */
    List<Inventory> findByOwnerId(Long id);

    /**
     * Znajduje wszystkie rekordy Inventory, które nie są oznaczone jako usunięte.
     *
     * @return lista obiektów Inventory, które nie są usunięte.
     */
    List<Inventory> findByDeletedFalse();

    /**
     * Znajduje wszystkie rekordy Inventory dla danego właściciela, które nie są oznaczone jako usunięte.
     *
     * @param ownerId identyfikator właściciela.
     * @return lista obiektów Inventory należących do właściciela o podanym ID, które nie są usunięte.
     */
    List<Inventory> findByOwnerIdAndDeletedFalse(Long ownerId);

    /**
     * Znajduje wszystkie rekordy Inventory dla danego właściciela, które nie są oznaczone jako usunięte i mają inny status wypożyczenia niż podany.
     *
     * @param ownerId    identyfikator właściciela.
     * @param itemStatus status przedmiotu, który ma być wykluczony.
     * @return lista obiektów Inventory należących do właściciela o podanym ID, które nie są usunięte i mają inny status wypożyczenia niż podany.
     */
    List<Inventory> findByOwnerIdAndDeletedFalseAndRentStatusNot(Long ownerId, ItemStatus itemStatus);
}
