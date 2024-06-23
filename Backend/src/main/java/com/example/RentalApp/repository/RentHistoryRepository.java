package com.example.RentalApp.repository;

import com.example.RentalApp.model.RentHistory;
import com.example.RentalApp.model.RentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Interfejs repozytorium do zarządzania encjami RentHistory.
 */
@Repository
public interface RentHistoryRepository extends JpaRepository<RentHistory, Integer> {

    /**
     * Znajduje wszystkie rekordy RentHistory dla danego użytkownika.
     *
     * @param userId identyfikator użytkownika.
     * @return lista obiektów RentHistory powiązanych z użytkownikiem o podanym ID.
     */
    List<RentHistory> findByUserId(Integer userId);

    /**
     * Znajduje wszystkie rekordy RentHistory dla danego przedmiotu inwentarza.
     *
     * @param inventoryId identyfikator przedmiotu inwentarza.
     * @return lista obiektów RentHistory powiązanych z przedmiotem inwentarza o podanym ID.
     */
    List<RentHistory> findByInventoryId(Integer inventoryId);

    /**
     * Znajduje pierwszy rekord RentHistory dla danego przedmiotu inwentarza,
     * który ma inny status wypożyczenia niż podany.
     *
     * @param inventoryId identyfikator przedmiotu inwentarza.
     * @param rentStatus  status wypożyczenia, który ma być wykluczony.
     * @return pierwszy obiekt RentHistory powiązany z przedmiotem inwentarza o podanym ID,
     * który ma inny status wypożyczenia niż podany.
     */
    RentHistory findFirstByInventoryIdAndRentStatusNot(Integer inventoryId, RentStatus rentStatus);
}
