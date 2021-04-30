package com.ims.server.itemAction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ItemActionRepository extends JpaRepository<ItemAction, Long> {

    List<ItemAction> findByItemId(Long itemId);

    Optional<ItemAction> findByIdAndItemId(Long id, Long itemId);
}
