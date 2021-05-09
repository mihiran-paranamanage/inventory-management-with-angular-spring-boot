package com.ims.server.itemAction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

import com.ims.server.item.Item;

@Repository
public interface ItemActionRepository extends JpaRepository<ItemAction, Long> {

    List<ItemAction> findByItemId(Long itemId);

    Optional<ItemAction> findByIdAndItemId(Long id, Long itemId);

    List<ItemAction> findByCreatedDateBetween(LocalDateTime startDate, LocalDateTime endDate);

    void deleteAllByItem(Item item);
}
